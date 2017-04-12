import colors from 'colors';
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

jest.mock('colors', () => {
	return {
		red: jest.fn(),
		bold: jest.fn()
	};
});

describe('load-config', () => {
	beforeEach(() => {
		colors.red.mockImplementation(msg => `red ${msg}`);
		colors.bold.mockImplementation(msg => `bold ${msg}`);
	});

	afterEach(() => {
		jest.resetAllMocks();
		if (jest.isMockFunction(process.stderr.write)) process.stderr.write.mockClear();
		if (jest.isMockFunction(process.exit)) process.exit.mockClear();
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

	it('should log and exit with status 1 when the config file given does not exist', () => {
		jest.spyOn(process.stderr, 'write').mockImplementation(() => jest.fn());
		jest.spyOn(process, 'exit').mockImplementation(() => jest.fn());

		loadConfig({ config: '/dev/null/.repoir.json' });

		expect(process.stderr.write).toBeCalledWith('red bold \n✘ Could not find the configuration file: /dev/null/.repoir.json\n\n');
	});
});
