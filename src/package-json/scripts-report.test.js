
import scriptsReport from './scripts-report';

describe('package-json/scripts-report', () => {

	it('should validate that this project is up to snuff', () => {
		
		return scriptsReport({
			projectRoot: '../../'
		})
		.then( errors => {
			expect(errors).toHaveLength(0);
		});

	});

});