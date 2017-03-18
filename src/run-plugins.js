
export default (program, config) => {

	// run plugins and pass them their config ruleset
	const results = [];
	Object.keys(config.plugins).forEach(function (key) {
		let result;
		const plugin = config.plugins[key];
		if (program.fix) {
			console.log('fixing', key);
			result = plugin.fix(config.rules[key]);
		}
		else {
			console.log('test', key);
			result = plugin.test(config.rules[key]);
		}
		results.push(result);
	});
	return Promise.all(results);

};