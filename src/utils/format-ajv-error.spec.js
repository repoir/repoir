import { formatAjvError } from './format-ajv-error';

describe('formatAjvError', () => {
	it('should default to using the error message file when given an unknown keyword', () => {
		const result = formatAjvError({
			message: 'has a generic error message',
			dataPath: '.test'
		}, 'foo-bar.txt');

		expect(result).toEqual('foo-bar.txt has a generic error message');
	});

	it('should format required keyword errors when given an empty data path', () => {
		const result = formatAjvError({
			keyword: 'required',
			message: 'is missing a required property',
			dataPath: ''
		}, 'foo-bar.txt');

		expect(result).toEqual('foo-bar.txt is missing a required property');
	});

	it('should format required keyword errors when given a data path', () => {
		const result = formatAjvError({
			keyword: 'required',
			message: 'is a required property',
			dataPath: '.test'
		}, 'foo-bar.txt');

		expect(result).toEqual('foo-bar.txt \'test\' is a required property');
	});

	it('should format enum keyword errors', () => {
		const result = formatAjvError({
			keyword: 'enum',
			message: 'is not one of the allowed values',
			dataPath: '.test',
			params: {
				allowedValues: ['one', 'two', 'three']
			}
		}, 'foo-bar.txt');

		expect(result).toEqual('foo-bar.txt \'test\' is not one of the allowed values: \'one\', \'two\', \'three\'');
	});
});
