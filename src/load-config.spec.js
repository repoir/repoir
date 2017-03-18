
import loadConfig from './load-config';

describe('load-config', () => {

	it ('should load config in this repo', () => {
		const config = loadConfig();
		expect(config).toBeDefined();
		expect(config.extends).toEqual('example');
	});

});