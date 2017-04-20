import colors from 'colors';
import runReport from './run-report';
import { table } from 'table';

jest.mock('colors', () => {
	return {
		green: jest.fn(),
		red: jest.fn(),
		bold: jest.fn()
	};
});

jest.mock('table');

describe('runReport', () => {
	let program;

	beforeEach(() => {
		jest.spyOn(process.stderr, 'write').mockImplementation(() => jest.fn());

		program = { config: '.repoir.json' };

		colors.green.mockImplementation(msg => `green ${msg}`);
		colors.red.mockImplementation(msg => `red ${msg}`);
		colors.bold.mockImplementation(msg => `bold ${msg}`);
	});

	afterEach(() => {
		process.stderr.write.mockClear();
		jest.resetAllMocks();
	});

	it('should report success when no problems are detected', () => {
		runReport(program, []);
		expect(process.stderr.write).toBeCalledWith('green bold \n✔ No problems were detected with your repo!\n\n');
	});

	it('should report failure when problems are detected', () => {
		runReport(program, [
			{
				plugin: 'foobar',
				problems: [
					{ message: 'error message 1' }
				]
			},
			{
				plugin: 'helloworld',
				problems: [
					{ message: 'error message 2' }
				]
			}
		]);

		expect(process.stderr.write).toBeCalledWith('red bold \n✘ Problems with your repo were detected:\n');

		expect(table).toBeCalledWith([
			['Plugin', 'Problem'],
			['foobar', 'error message 1'],
			['helloworld', 'error message 2']
		]);
	});
});
