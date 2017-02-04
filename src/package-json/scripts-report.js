
export function scriptsReport ({projectRoot}) {
	
	const packageJson = require(`${projectRoot}/package.json`);

	console.log(packageJson);

}
