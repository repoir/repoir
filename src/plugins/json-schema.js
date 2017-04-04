import fs from 'fs';
import Ajv from 'ajv';

const ajv = new Ajv();

export const meta = {
	key: 'json-schema',
	description: ''
};

export function test (ruleConfig) {
	return new Promise((resolve, reject) => {
		ruleConfig.forEach(config => {
			const { file, schema } = config;
			const data = JSON.parse(fs.readFileSync(file, 'utf8'));
			const valid = ajv.validate(schema, data);

			if (!valid) {
				resolve([
					{ message: ajv.errorsText().replace('data.', ''), file }
				]);
			} else {
				resolve([]);
			}
		});
	});
}
