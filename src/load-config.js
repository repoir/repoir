// @flow

import colors from 'colors';
import { merge } from 'lodash';
import { resolve } from 'path';

type config = {
	plugins: Array<string>,
	loadedPlugins: {
		[string]: Object
	},
	rules: {
		string: string
	}
}

export default function loadConfig (program: Object): config {
	const defaultConfig = require(`${__dirname}/../.repoir.json`);

	let projectConfig;

	try {
		projectConfig = require(resolve(program.config));
	} catch (error) {
		write(colors.red(colors.bold(`\n✘ Could not find the configuration file: ${program.config}\n\n`)));
		process.exit(1);
	}

	return merge({}, defaultConfig, projectConfig);
}

function write (message: string): void {
	process.stderr.write(message);
}
