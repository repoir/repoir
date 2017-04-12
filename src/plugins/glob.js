import { compact, flatten } from 'lodash';
import glob from 'glob';

const globOptions = {
	dot: true,
	mark: true,
	follow: true
};

export const schema = {
	type: 'object',
	properties: {
		include: {
			type: 'array',
			items: [
				{
					type: 'string'
				}
			]
		},
		exclude: {
			type: 'array'
		}
	},
	additionalProperties: false
};

export function test (ruleConfig) {
	const { include, exclude } = ruleConfig;

	return Promise.all(compact([
		Array.isArray(include) ? globPatterns(include, matches => matches.length > 0, 'No files were found matching the pattern: ') : null,
		Array.isArray(exclude) ? globPatterns(exclude, matches => matches.length === 0, 'Files were found matching the pattern: ') : null
	]))
	.then(results => {
		const result = results.map(result => flatten(result));
		return flatten(result);
	});
}

function globPatterns (patterns, condition, message) {
	return Promise.all(patterns.map(pattern => {
		return new Promise((resolve, reject) => {
			glob(pattern, globOptions, (err, matches) => {
				if (err) resolve([ { message: err.message + pattern, pattern } ]);
				else if (!condition(matches)) resolve([ { message: message + pattern, pattern } ]);
				else resolve([]);
			});
		});
	}));
}
