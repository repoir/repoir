

// this file is responsible for 
// 1. loading default options - e.g. repoir/.repoir - internal repoir default config
// 2. load user options - e.g. ~/.repoir
// 3. load node_modules options - e.g. {project}/node_modules/repoir-config-{name}
// 4. load project options - e.g. {project}/.repoir 
// 5. apply any passed in params (CLI will pass its options to this class to merge in)

export default (cliOptions) => {

	// load default repoir config file
	const defaultConfig = require(`${__dirname}/../.repoir`);

	// load .repoir config file
	//const projectConfig = require(`${process.cwd()}/.repoir`);

	// merge config files
	const config = Object.assign({}, defaultConfig);//, projectConfig);

	return config;
};
