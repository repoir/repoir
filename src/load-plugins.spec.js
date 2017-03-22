
import loadPlugins from './load-plugins';

describe('load-plugins', () => {
	const config = {
		plugins: [
			'package-json-organizer'
		]
	};

	it('should load plugins in this repo', () => {
		const plugins = loadPlugins(config.plugins);
		expect(plugins).toBeDefined();
		expect(plugins['package-json-organizer'].meta.description).toBeDefined();
	});
});
