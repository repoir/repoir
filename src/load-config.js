

export default () => {

	// load default repoir config file
	const defaultConfig = require(`${__dirname}/../.repoir`);

	// load .repoir config file
	//const projectConfig = require(`${process.cwd()}/.repoir`);

	// merge config files
	const config = Object.assign({}, defaultConfig);//, projectConfig);

	return config;
};
