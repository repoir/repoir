
// the main execution engine
// 1. load configuration files
// 2. load plugins
// 3. run plugins (either verify or fix)
// 4. report results

import loadConfig from './load-config';
import loadPlugins from './load-plugins';
import runPlugins from './run-plugins';
import runReport from './run-report';

export default (program) => {

	// load config
	const config = loadConfig();

	// load plugins
	config.plugins = loadPlugins(config.plugins);

	// run plugins (verify or fix)
	runPlugins(program, config).then( result => {

		// report results (cli or file or obj)
		runReport(program, result);

	}).catch( err => {
		console.log('something failed', err);
	});

};