
import fs from 'fs';

export const schema = {
	type: 'array',
	items: {
		type: 'string'
	}
};

const defaultConfig = [
	'.eslintrc',
	'package.json'
];

export function test (ruleConfig) {
	return new Promise((resolve, reject) => {
		if (!ruleConfig) {
			ruleConfig = defaultConfig;
		}
		const result = [];
		for (const file of ruleConfig) {	
			if (!fs.existsSync(`${process.cwd()}/${file}`)) {
				result.push({ message: `${file} not found.` });
			}
		}
		return resolve(result);
	});
}