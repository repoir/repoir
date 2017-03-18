
import loadConfig from './load-config';
import runPlugins from './run-plugins';

// this class is responsible for the following
// 1. translating incoming cli args to options that are understood by the execution engine
// 2. load the config
// 3. run the execution engine (repoir)
// 4. report the results to the cli

export default (program) => {

    console.log('REPOIRing your repo');

	// load config
	const config = loadConfig();
	console.log('loaded config', config);

	// run plugins
	runPlugins(config);

};