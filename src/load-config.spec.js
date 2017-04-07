import loadConfig from './load-config';

jest.mock(`${__dirname}/../.repoir.json`, () => {
	return {
		hello: 'world',
		foo: {
			bar: true
		}
	};
}, { virtual: true });

jest.mock(`${process.cwd()}/.repoir.json`, () => {
	return {
		foo: {
			bar: false
		}
	};
}, { virtual: true });

describe('load-config', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should merge the project config with the default config', () => {
		const result = loadConfig({
			config: `${process.cwd()}/.repoir.json`
		});

		expect(result).toEqual({
			hello: 'world',
			foo: {
				bar: false
			}
		});
	});
});
