import colors from 'colors';
import { table } from 'table';

export default function runReport (program, results) {
	const problems = getProblems(results);

	if (problems.length === 0) {
		write(colors.green(colors.bold('\n✔ No problems were detected with your repo!\n\n')));
	} else {
		write(colors.red(colors.bold('\n✘ Problems with your repo were detected:\n')));

		const data = problems.map(({ plugin, message }) => {
			return [colors.gray(plugin), message];
		});

		write(`\n${table(data)}\n`);
	}
}

function write (message) {
	process.stderr.write(message);
}

function getProblems (results) {
	let problems = [];

	results.forEach(result => {
		problems = problems.concat(result.problems.map(problem => {
			problem.plugin = result.plugin;
			return problem;
		}));
	});

	return problems;
}
