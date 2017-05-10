// @flow

import type { config, program } from './types.js';
import colors from 'colors';
import { merge } from 'lodash';
import { resolve } from 'path';

export default function loadConfig (program: program): config {
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
