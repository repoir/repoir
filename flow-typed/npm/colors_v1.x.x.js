declare module "colors" {
	declare var enabled: boolean;
	declare function red(str: string): string;
	declare function bold(str: string): string;
	declare function green(str: string): string;
	declare function setTheme(theme: string | { [string]: string }): void;
	declare function strip(str: string): string;
	declare function stylize(str: string, stylize: string): string;
	declare function supportsColor(): boolean;
	declare function trap(text: string, options?: {}): string;
	declare function zalgo(text: string, options?: {}): string;
};
