
export default function report ({pwd}, commands) {
	
	console.log('pwd', pwd);
	console.log('commands', commands);
	const packageJson = require(`${pwd}/package.json`);
	const scripts = packageJson.scripts;

	const errors = [];

	for (const command of commands) {
		if (!scripts[command]) {
			errors.push(`Missing "npm run ${command}" from package.json scripts block`);
		}
	}

	return Promise.resolve(errors);
}
