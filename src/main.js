
// The main execution engine
// 1. load configuration files
// 2. load plugins
// 3. run plugins (either verify or fix)
// 4. report results

import loadConfig from './load-config';
import loadPlugins from './load-plugins';
import runPlugins from './run-plugins';
import runReport from './run-report';

export default (program) => {
	// Load config
	const config = loadConfig();

	// Load plugins
	config.plugins = loadPlugins(config.plugins);

	// Run plugins (verify or fix)
	runPlugins(program, config).then(result => {
		// Report results (cli or file or obj)
		runReport(program, result);

		result.forEach(result => {
			if (result.problems.length > 0) process.exit(1);
		});
	}).catch(err => {

	});
};
