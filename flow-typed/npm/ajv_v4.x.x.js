declare module "ajv" {
	declare export default class Ajv {
		errors: any;
		validate(schemaRefKey: string | {}, data: any): boolean;
	}
};
