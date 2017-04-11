import main from '../dist/main';

const mockCommander = {};

jest.mock('commander', () => {
	mockCommander.version = () => mockCommander;
	mockCommander.option = () => mockCommander;
	mockCommander.parse = () => mockCommander;

	return mockCommander;
});

jest.mock('../dist/main', () => {
	return { default: jest.fn() };
}, {
	virtual: true
});

describe('repoir', () => {
	beforeEach(() => {
		process.argv = [
			'node',
			'/path/to/repoir',
			'--config',
			'.repoir.json'
		];

		require.requireActual('./repoir');
	});

	it('should call the main function of the app with options', () => {
		expect(main.default).toBeCalledWith(mockCommander);
	});
});
