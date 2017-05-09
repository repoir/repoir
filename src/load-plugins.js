// @flow

export default function loadPlugins (pluginNames: Array<string>): {[string]: Object} {
	const loadedPlugins: Object = {};

	pluginNames.forEach((pluginName: string): void => {
		try {
			loadedPlugins[pluginName] = require(`${__dirname}/plugins/${pluginName}`);
		} catch (err) {
			loadedPlugins[pluginName] = require(`${process.cwd()}/node_modules/repoir-plugin-${pluginName}`);
		}
	});

	return loadedPlugins;
}
