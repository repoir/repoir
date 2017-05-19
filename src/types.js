export type config = {
	plugins: string,
	loadedPlugins: {
		[string]: Object
	},
	rules: {
		string: string
	}
};
export type program = {
	config: string,
	fix: boolean
};
