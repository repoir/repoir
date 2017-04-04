export default function runPlugins (program, config) {
	return Promise.all(Object.keys(config.plugins).map(key => {
		const plugin = config.plugins[key];

		let promise;

		if (program.fix) {
			promise = plugin.fix(config.rules[key]);
		} else {
			promise = plugin.test(config.rules[key]);
		}

		return promise.then(problems => {
			return {
				plugin: key,
				problems
			};
		});
	}));
}
