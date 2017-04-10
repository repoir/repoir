import Ajv from 'ajv';

export default function runPlugins (program, config) {
	return Promise.all(Object.keys(config.plugins).map(key => {
		const plugin = config.plugins[key];

		if (typeof plugin.schema === 'object') {
			const ajv = new Ajv();

			if (!ajv.validate(plugin.schema, config.rules[key])) {
				throw new Error(ajv.errors[0]);
			}
		}

		let promise;

		if (program.fix) {
			promise = plugin.fix(config.rules[key], program);
		} else {
			promise = plugin.test(config.rules[key], program);
		}

		return promise.then(problems => {
			return {
				plugin: key,
				problems
			};
		});
	}));
}
