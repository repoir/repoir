import fs from 'fs';
import path from 'path';
import { test } from './json-schema';

jest.mock('fs');

describe('json-schema', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should resolve with an empty array when given a file that matches the schema', async () => {
		fs.existsSync.mockReturnValue(true);

		fs.readFileSync.mockReturnValueOnce(JSON.stringify({
			foo: 'bar'
		}));

		fs.readFileSync.mockReturnValueOnce(JSON.stringify({
			properties: {
				foo: { type: 'string' }
			},
			required: ['foo']
		}));

		const result = await test([ {
			file: 'foobar.json',
			schema: 'foobar.schema.json'
		} ], { config: '/the/path' });

		expect(result).toEqual([]);
	});

	it('should resolve with the list of problems when given a file not matching the schema', async () => {
		fs.existsSync.mockReturnValue(true);

		fs.readFileSync.mockReturnValueOnce(JSON.stringify({}));

		fs.readFileSync.mockReturnValueOnce(JSON.stringify({
			type: 'object',
			properties: {
				foo: { type: 'string' },
				bar: { type: 'string' }
			},
			required: ['foo', 'bar']
		}));

		const result = await test([ {
			file: 'foobar.json',
			schema: 'foobar.schema.json'
		} ], { config: '/the/path' });

		expect(result).toEqual([
			{
				file: 'foobar.json',
				message: ' should have required property \'foo\'',
				missingProperty: 'foo'
			},
			{
				file: 'foobar.json',
				message: ' should have required property \'bar\'',
				missingProperty: 'bar'
			}
		]);
	});

	it('should resolve with the list of problems when given a file that does not exist', async () => {
		fs.existsSync.mockReturnValue(false);

		const result = await test([ {
			file: 'foobar.json',
			schema: 'foobar.schema.json'
		} ], { config: '/the/path' });

		expect(result).toEqual([ {
			message: 'File does not exist: foobar.json'
		} ]);
	});

	it('should resolve with the list of problems when given a file with invalid JSON', async () => {
		fs.existsSync.mockReturnValue(true);

		fs.readFileSync.mockReturnValue('{');

		const result = await test([ {
			file: 'foobar.json',
			schema: 'foobar.json'
		} ], { config: '/the/path' });

		expect(result).toEqual([ {
			message: 'Invalid JSON: foobar.json'
		} ]);
	});

	it('should resolve with the list of problems when given a schema that does not exist', async () => {
		fs.existsSync.mockReturnValueOnce(true);

		fs.readFileSync.mockReturnValueOnce(JSON.stringify({}));

		fs.existsSync.mockReturnValueOnce(false);

		const result = await test([ {
			file: 'foobar.json',
			schema: 'foobar.schema.json'
		} ], { config: '/the/path' });

		expect(result).toEqual([ {
			message: 'File does not exist: foobar.schema.json'
		} ]);
	});

	it('should resolve with the list of problems when given a schema with invalid JSON', async () => {
		fs.existsSync.mockReturnValue(true);

		fs.readFileSync.mockReturnValueOnce(JSON.stringify({}));

		fs.readFileSync.mockReturnValueOnce('{');

		const result = await test([ {
			file: 'foobar.json',
			schema: 'foobar.schema.json'
		} ], { config: '/the/path' });

		expect(result).toEqual([ {
			message: 'Invalid JSON: foobar.schema.json'
		} ]);
	});

	it('should resolve schemas relative to the repoir file', async () => {
		fs.existsSync.mockReturnValue(true);

		await test([ {
			file: 'foobar.json',
			schema: 'foobar.schema.json'
		} ], { config: '../fake-config-dir/foobar/.repoir.json' });

		const result = path.relative(process.cwd(), fs.readFileSync.mock.calls[1][0]);

		expect(result).toEqual('../fake-config-dir/foobar/foobar.schema.json');
	});
});
