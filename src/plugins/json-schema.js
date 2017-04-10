import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';

export const schema = {
	type: 'array',
	items: {
		$ref: '#/definitions/item'
	},
	definitions: {
		item: {
			properties: {
				file: {
					type: 'string'
				},
				schema: {
					type: 'string'
				}
			},
			required: ['file', 'schema']
		}
	}
};

export function test (ruleConfig, program) {
	return Promise.all(ruleConfig.map(config => {
		return new Promise(validate.bind(null, config, program));
	}))
	.then(results => results.reduce((accumulator, value) => {
		return accumulator.concat(value);
	}, []));
}

function validate (config, program, resolve, reject) {
	const ajv = new Ajv({ allErrors: true });
	const { file, schema } = config;
	const loadedFile = load(file);
	const loadedSchema = load(schema, path.dirname(program.config));

	if (loadedFile.error) return resolve([loadedFile.error]);
	if (loadedSchema.error) return resolve([loadedSchema.error]);

	if (!ajv.validate(loadedSchema.data, loadedFile.data)) {
		resolve(ajv.errors.map(error => {
			return Object.assign({}, error.params, {
				message: `${error.dataPath.slice(1)} ${error.message}`,
				file
			});
		}));
	}

	resolve([]);
}

function load (file, relativePath) {
	const resolvedFile = !relativePath ?
		path.resolve(file) :
		path.resolve(path.relative(process.cwd(), path.join(relativePath, file)));

	if (!fs.existsSync(resolvedFile)) {
		return {
			error: { message: `File does not exist: ${file}` },
			data: null
		};
	}

	try {
		return {
			error: null,
			data: JSON.parse(fs.readFileSync(resolvedFile, 'utf8'))
		};
	} catch (error) {
		return {
			error: {
				message: `Invalid JSON: ${file}`
			},
			data: null
		};
	}
}
