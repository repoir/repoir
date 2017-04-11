import loadConfig from './load-config';
import loadPlugins from './load-plugins';
import main from './main';
import runPlugins from './run-plugins';
import runReport from './run-report';

jest.mock('./load-config');
jest.mock('./load-plugins');
jest.mock('./run-plugins');
jest.mock('./run-report');

describe('main', () => {
	let _exit;

	beforeEach(() => {
		_exit = process.exit;
		process.exit = jest.fn();

		loadConfig.mockReturnValue({ plugins: [], rules: {} });
		loadPlugins.mockReturnValue({});
		runPlugins.mockReturnValue(Promise.resolve([]));
	});

	afterEach(() => {
		process.exit = _exit;
		jest.resetAllMocks();
	});

	it('should load the config', async () => {
		await main({ config: '/path/to/config' });
		expect(loadConfig).toBeCalled();
	});

	it('should load the plugins', async () => {
		await main({ config: '/path/to/config' });
		expect(loadPlugins).toBeCalled();
	});

	it('should run the plugins', async () => {
		await main({ config: '/path/to/config' });
		expect(runPlugins).toBeCalled();
	});

	it('should run the report', async () => {
		await main({ config: '/path/to/config' });
		expect(runReport).toBeCalled();
	});

	it('should exit with status 0 if there are no problems detected', async () => {
		await main({ config: '/path/to/config' });
		expect(process.exit).toBeCalledWith(0);
	});

	it('should exit with status 1 if there are problems detected', async () => {
		runPlugins.mockReturnValue(Promise.resolve([
			{
				plugin: 'test1',
				problems: []
			},
			{
				plugin: 'test2',
				problems: [
					{ message: 'foo bar' }
				]
			}
		]));

		await main({ config: '/path/to/config' });
		expect(process.exit).toBeCalledWith(1);
	});
});
