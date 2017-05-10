// @flow

import Ajv from 'ajv';
import { formatAjvError } from '../utils';
import fs from 'fs';
import path from 'path';

type schemaType = {
	definitions: {
		item: {
			properties: {
				file: {
					type: string
				},
				schema: {
					type: string
				}
			},
			required: Array<string>
		}
	},
	items: {
		$ref: string
	},
	type: string
};
export const schema: schemaType = {
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

type ruleConfigType = {
	file: string,
	schema: string
};

export function test (ruleConfig: Array<ruleConfigType>, program: Object) {
	return Promise.all(ruleConfig.map((config): Promise<Array<Object>> => {
		return new Promise(validate.bind(null, config, program));
	}))
	.then(results => results.reduce((accumulator, value) => {
		return accumulator.concat(value);
	}, []));
}

function validate (config, program, resolve: (result: Array<Object>) => void, reject: (error: any) => void) : void {
	const ajv: Ajv = new Ajv({ allErrors: true });
	const { file, schema } = config;
	const loadedFile = load(file);
	const loadedSchema = load(schema, path.dirname(program.config));

	if (loadedFile.error) return resolve([loadedFile.error]);
	if (loadedSchema.error) return resolve([loadedSchema.error]);

	if (!ajv.validate(loadedSchema.data, loadedFile.data)) {
		resolve(ajv.errors.map(error => {
			return Object.assign({}, error.params, {
				message: formatAjvError(error, file),
				file
			});
		}));
	}

	resolve([]);
}

function load (file: string, relativePath: string | void): Object {
	const resolvedFile: string = !relativePath ?
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
