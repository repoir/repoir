import loadConfig from './load-config';
import loadPlugins from './load-plugins';
import runPlugins from './run-plugins';
import runReport from './run-report';

/**
 * The main execution engine:
 * 1. Load configuration files
 * 2. Load plugins
 * 3. Run plugins (either verify or fix)
 * 4. Report results
 * @param {Object} program - Command line options
 */
export default async function main (program) {
	const config = loadConfig();
	config.plugins = loadPlugins(config.plugins);
	const result = await runPlugins(program, config);

	runReport(program, result).forEach(result => {
		if (result.problems.length > 0) {
			process.exit(1);
		}
	});
}
