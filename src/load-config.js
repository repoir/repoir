import { merge } from 'lodash';

export default function loadConfig (program) {
	const defaultConfig = require(`${__dirname}/../.repoir.json`);
	const projectConfig = require(program.config);

	return merge({}, defaultConfig, projectConfig);
}
