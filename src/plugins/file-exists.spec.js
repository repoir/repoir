import fs from 'fs';
import { test } from './file-exists';

jest.mock('fs');

describe('file-exists', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should resolve with an empty array when given a file that matches', async () => {
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

		const result = await test(['foobar.json']);

		expect(result).toEqual([]);
	});
});
