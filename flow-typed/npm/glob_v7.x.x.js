declare module "glob" {
	declare class Glob {
		constructor(pattern: string, options?: Object, cb: function): void;
	}
	declare function glob(pattern: string, options?: Object, cb: function): Glob;

	declare module.exports: {
		(): glob
	};
};
