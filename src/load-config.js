import { merge } from 'lodash';
import { resolve } from 'path';

export default function loadConfig (program) {
	const defaultConfig = require(`${__dirname}/../.repoir.json`);
	const projectConfig = require(resolve(program.config));

	return merge({}, defaultConfig, projectConfig);
}
