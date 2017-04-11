import Ajv from 'ajv';
import { formatAjvError } from './utils';

export default function runPlugins (program, config) {
	return Promise.all(Object.keys(config.plugins).map(key => {
		if (typeof config.rules[key] === 'undefined') {
			return Promise.resolve({
				plugin: key,
				problems: []
			});
		}

		const plugin = config.plugins[key];

		if (typeof plugin.schema === 'object') {
			const ajv = new Ajv();

			if (!ajv.validate(plugin.schema, config.rules[key])) {
				return Promise.resolve({
					plugin: key,
					problems: ajv.errors.map(error => {
						return {
							message: formatAjvError(error, program.config)
						};
					})
				});
			}
		}

		return plugin.test(config.rules[key], program)
		.then(problems => {
			return {
				plugin: key,
				problems
			};
		});
	}));
}
