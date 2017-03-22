
// This file is responsible for loading the actual plugin code, this is done via require()

export default (pluginNames) => {
	const loadedPlugins = {}; // { "package-json-organizer": { function fix () {}, function verify () {} }}

	pluginNames.forEach(pluginName => {
		try {
			// Try to load from local project first
			loadedPlugins[pluginName] = require(`${__dirname}/plugins/${pluginName}`);
		} catch (err) {
			// Otherwise load from cwd node_modules
			loadedPlugins[pluginName] = require(`${process.cwd()}/../node_modules/repoir-plugin-${pluginName}`);
		}
	});

	return loadedPlugins;
};
