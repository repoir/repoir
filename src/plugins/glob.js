// @flow

import { compact, flatten } from 'lodash';
import glob from 'glob';

const globOptions = {
	dot: true,
	mark: true,
	follow: true
};

export const schema: {
	additionalProperties: boolean,
	properties: {
		exclude: {
			type: string
		}, include: {
			items: [
				{
					type: string
				}
			],
			type: string
		}
	},
	type: string
} = {
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

type ruleConfigType = {
	include: Array<string>,
	exclude: Array<string>
};

export function test (ruleConfig: ruleConfigType) {
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

function globPatterns (patterns: Array<string>, condition: (matches: Array<string>) => boolean, message: string): Promise<any> {
	return Promise.all(patterns.map((pattern): Promise<Array<Object>> => {
		return new Promise((resolve: (result: Array<Object>) => void, reject: (error: any) => void): void => {
			glob(pattern, globOptions, (err, matches): void => {
				if (err) resolve([ { message: err.message + pattern, pattern } ]);
				else if (!condition(matches)) resolve([ { message: message + pattern, pattern } ]);
				else resolve([]);
			});
		});
	}));
}
