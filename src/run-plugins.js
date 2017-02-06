
export default (config) => {

	// loop over plugins and load them
	Object.keys(config).forEach( value => {
		console.log(value)
	})
	// System.import(`./${}`)
    // .then(some_module => {
    //     // Use some_module
    // })
    // .catch(error => {
    //     ...
    // });

	// Promise.all(['module1', 'module2', 'module3']
    //     .map(x => System.import(x)))
    // .then(([module1, module2, module3]) => {
    //     // Use module1, module2, module3
    // });
	const result = require('./npm-scripts/report').default(config, config['npm-scripts']);
	return result.then( errors => {
		console.log('errors', errors);
	});

};