import { formatAjvError } from './utils';
import runPlugins from './run-plugins';

const mockValidate = jest.fn();
const mockErrors = jest.fn();

jest.mock('ajv', () => {
	return function () {
		this.validate = mockValidate;
		this.errors = mockErrors();
	};
});

jest.mock('./utils');

describe('runPlugins', () => {
	let program;

	beforeEach(() => {
		program = {
			config: '.repoir.json'
		};

		formatAjvError.mockImplementation(error => `formatted ${error.message}`);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should resolve results with no problems for plugins that have no rules specified', async () => {
		const result = await runPlugins(program, {
			plugins: { foobar: {} },
			rules: {}
		});

		expect(result).toEqual([ {
			plugin: 'foobar',
			problems: []
		} ]);
	});

	it('should resolve results with schema validation errors for plugins that have a schema defined', async () => {
		mockValidate.mockReturnValue(false);
		mockErrors.mockReturnValue([ { message: 'foo bar' } ]);

		const result = await runPlugins(program, {
			plugins: {
				foobar: {
					schema: { type: 'string' }
				}
			},
			rules: { foobar: [] }
		});

		expect(result).toEqual([ {
			plugin: 'foobar',
			problems: [
				{ message: 'formatted foo bar' }
			]
		} ]);
	});

	it('should resolve results with no problems for plugins that pass schema validation', async () => {
		mockValidate.mockReturnValue(true);

		const result = await runPlugins(program, {
			plugins: {
				foobar: {
					schema: { type: 'object' },
					test: jest.fn().mockReturnValue(Promise.resolve([]))
				}
			},
			rules: {
				foobar: {}
			}
		});

		expect(result).toEqual([ {
			plugin: 'foobar',
			problems: []
		} ]);
	});

	it('should run each plugins test method and resolve the results combined together', async () => {
		const result = await runPlugins(program, {
			plugins: {
				foobar: {
					test: jest.fn().mockReturnValue(Promise.resolve([
						{ message: 'error message 1' }
					]))
				},
				helloworld: {
					test: jest.fn().mockReturnValue(Promise.resolve([
						{ message: 'error message 2' }
					]))
				}
			},
			rules: {
				foobar: {},
				helloworld: {}
			}
		});

		expect(result).toEqual([
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
	});
});
