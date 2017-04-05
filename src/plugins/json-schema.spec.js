import { test } from './json-schema';
import fs from 'fs';

jest.mock('fs');

describe('json-schema', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('when given a file not matching the schema', () => {
		it('should resolve with the list of problems', async () => {
			fs.readFileSync.mockReturnValue(JSON.stringify({}));

			const result = await test([ {
				file: 'foobar.json',
				schema: {
					type: 'object',
					properties: {
						foo: { type: 'string' },
						bar: { type: 'string' }
					},
					required: ['foo', 'bar']
				}
			} ]);

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
	});
});
