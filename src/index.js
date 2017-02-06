
import loadConfig from './load-config';
import runPlugins from './run-plugins';

export default (program) => {

    console.log('REPOIR-in your repo');

	// load config
	const config = loadConfig();

	// run plugins
	runPlugins(config);

};