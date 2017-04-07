export default function loadPlugins (pluginNames) {
	const loadedPlugins = {};

	pluginNames.forEach(pluginName => {
		try {
			loadedPlugins[pluginName] = require(`${__dirname}/plugins/${pluginName}`);
		} catch (err) {
			loadedPlugins[pluginName] = require(`${process.cwd()}/node_modules/repoir-plugin-${pluginName}`);
		}
	});

	return loadedPlugins;
}
