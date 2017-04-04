import colors from 'colors';

export default (program, results) => {
	results.forEach(result => {
		const { plugin, problems } = result;

		write(`\n${colors.underline(plugin)}`);

		if (Array.isArray(problems)) {
			problems.forEach(problem => {
				write(`\n${colors.red('error')} ${problem.message}`);

				Object.keys(problem).forEach(key => {
					if (key === 'message') return;
					write(`\n    ${colors.gray(key)}${colors.gray(':')} ${colors.gray(problem[key])}`);
				});
			});
		}

		write('\n');
	});

	write('\n');
};

function write (message = '') {
	process.stderr.write(message);
}
