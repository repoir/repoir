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
			{ message: 'Did not find files with the include pattern specified', pattern: 'foobar.txt' },
			{ message: 'Did not find files with the include pattern specified', pattern: 'helloworld.txt' }
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
			{ message: 'error 1', pattern: 'foobar.txt' },
			{ message: 'error 2', pattern: 'helloworld.txt' }
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
			{ message: 'Found files with the exclude pattern specified', pattern: 'foobar.txt' },
			{ message: 'Found files with the exclude pattern specified', pattern: 'helloworld.txt' }
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
			{ message: 'error 1', pattern: 'foobar.txt' },
			{ message: 'error 2', pattern: 'helloworld.txt' }
		]);
	});
});
