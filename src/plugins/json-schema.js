import fs from 'fs';
import Ajv from 'ajv';

export const key = 'json-schema';

export function test (ruleConfig) {
	const ajv = new Ajv({ allErrors: true });

	return Promise.all(ruleConfig.map(config => {
		return new Promise((resolve, reject) => {
			const { file, schema } = config;
			const data = JSON.parse(fs.readFileSync(file, 'utf8'));

			if (!ajv.validate(schema, data)) {
				resolve(ajv.errors.map(error => {
					const result = Object.assign({}, error.params, {
						message: `${error.dataPath.slice(1)} ${error.message}`,
						file
					});
					return result;
				}));
			}

			resolve([]);
		});
	}))
	.then(results => {
		return results.reduce((accumulator, value) => {
			return accumulator.concat(value);
		}, []);
	});
}
