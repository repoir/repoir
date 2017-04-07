import loadPlugins from './load-plugins';

const mockCorePlugin = jest.fn();
const mockFoobarPlugin = jest.fn();

jest.mock(`${__dirname}/plugins/core-plugin`, () => {
	return mockCorePlugin;
}, { virtual: true });

jest.mock(`${process.cwd()}/node_modules/repoir-plugin-foobar`, () => {
	return mockFoobarPlugin;
}, { virtual: true });

describe('load-plugins', () => {
	it('should load and return core plugin implementations', () => {
		const plugins = loadPlugins(['core-plugin']);
		expect(plugins).toHaveProperty('core-plugin', mockCorePlugin);
	});

	it('should load and return external plugin implementations', () => {
		const plugins = loadPlugins(['foobar']);
		expect(plugins).toHaveProperty('foobar', mockFoobarPlugin);
	});
});
