declare module "table" {
	declare type column = {
		alignment: string,
		width: number,
		truncate: number,
		paddingLeft: number,
		paddingRight: number
	};
	declare type border = {
		topBody: string,
		topJoin: string,
		topLeft: string,
		topRight: string,
		bottomBody: string,
		bottomJoin: string,
		bottomLeft: string,
		bottomRight: string,
		bodyLeft: string,
		bodyRight: string,
		bodyJoin: string,
		joinBody: string,
		joinLeft: string,
		joinRight: string,
		joinJoin: string
	};
	declare function table(data: Array<Array<string>>,
		userConfig?: {
			border: border,
			columns: Array<column>,
			columnDefault: column,
			drawHorizontalLine: (index: number, size: number) => boolean
		}
	): string;
};
