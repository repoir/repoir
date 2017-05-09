// @flow

import loadConfig from './load-config';
import loadPlugins from './load-plugins';
import type { program } from './types.js';
import runPlugins from './run-plugins';
import runReport from './run-report';

export default async function main (program: program) {
	const config = loadConfig(program);
	config.loadedPlugins = loadPlugins(config.plugins);
	const result = await runPlugins(program, config);

	runReport(program, result);

	result.forEach(result => {
		if (result.problems.length > 0)
			process.exit(1);
	});

	process.exit(0);
}
