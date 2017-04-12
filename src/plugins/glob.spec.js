import { test } from './glob';

const mockGlobCb = jest.fn();

jest.mock('glob', () => {
	return (pattern, options, cb) => {
		cb(...mockGlobCb());
	};
});

describe('glob', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should resolve an empty array when included files exist', async () => {
		mockGlobCb.mockReturnValueOnce([null, ['foobar.txt']]);
		mockGlobCb.mockReturnValueOnce([null, ['helloworld.txt']]);

		const result = await test({
			include: [
				'foobar.txt',
				'helloworld.txt'
			]
		});

		expect(result).toEqual([]);
	});

	it('should resolve with an array of problems when included files do not exist', async () => {
		mockGlobCb.mockReturnValueOnce([null, []]);
		mockGlobCb.mockReturnValueOnce([null, []]);

		const result = await test({
			include: [
				'foobar.txt',
				'helloworld.txt'
			]
		});

		expect(result).toEqual([
			{ message: 'No files were found matching the pattern: foobar.txt', pattern: 'foobar.txt' },
			{ message: 'No files were found matching the pattern: helloworld.txt', pattern: 'helloworld.txt' }
		]);
	});

	it('should resolve with an array of problems when glob gives an error for included files', async () => {
		mockGlobCb.mockReturnValueOnce([new Error('error 1'), null]);
		mockGlobCb.mockReturnValueOnce([new Error('error 2'), null]);

		const result = await test({
			include: [
				'foobar.txt',
				'helloworld.txt'
			]
		});

		expect(result).toEqual([
			{ message: 'error 1foobar.txt', pattern: 'foobar.txt' },
			{ message: 'error 2helloworld.txt', pattern: 'helloworld.txt' }
		]);
	});

	it('should resolve an empty array when excluded files do not exist', async () => {
		mockGlobCb.mockReturnValueOnce([null, []]);
		mockGlobCb.mockReturnValueOnce([null, []]);

		const result = await test({
			exclude: [
				'foobar.txt',
				'helloworld.txt'
			]
		});

		expect(result).toEqual([]);
	});

	it('should resolve with an array of problems when excluded files exist', async () => {
		mockGlobCb.mockReturnValueOnce([null, ['foobar.txt']]);
		mockGlobCb.mockReturnValueOnce([null, ['helloworld.txt']]);

		const result = await test({
			exclude: [
				'foobar.txt',
				'helloworld.txt'
			]
		});

		expect(result).toEqual([
			{ message: 'Files were found matching the pattern: foobar.txt', pattern: 'foobar.txt' },
			{ message: 'Files were found matching the pattern: helloworld.txt', pattern: 'helloworld.txt' }
		]);
	});

	it('should resolve with an array of problems when glob gives an error for excluded files', async () => {
		mockGlobCb.mockReturnValueOnce([new Error('error 1'), null]);
		mockGlobCb.mockReturnValueOnce([new Error('error 2'), null]);

		const result = await test({
			exclude: [
				'foobar.txt',
				'helloworld.txt'
			]
		});

		expect(result).toEqual([
			{ message: 'error 1foobar.txt', pattern: 'foobar.txt' },
			{ message: 'error 2helloworld.txt', pattern: 'helloworld.txt' }
		]);
	});
});
