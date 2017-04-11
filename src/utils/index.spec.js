import * as index from './index';
import { formatAjvError } from './format-ajv-error';

jest.mock('./format-ajv-error.js');

describe('index', () => {
	it('should have property formatAjvError', () => {
		expect(index).toHaveProperty('formatAjvError', formatAjvError);
	});
});
