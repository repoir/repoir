// @flow

import colors from 'colors';
import type { program } from './types.js';
import { table } from 'table';

type result = {
	plugin: string,
	problems: Array<any>
}

export default function runReport (program: program, results: Array<result>): void {
	const problems = getProblems(results);

	if (problems.length === 0) {
		write(colors.green(colors.bold('\n✔ No problems were detected with your repo!\n\n')));
	} else {
		write(colors.red(colors.bold('\n✘ Problems with your repo were detected:\n')));

		const data = problems.map(({ plugin, message }) => {
			return [plugin, message];
		});

		data.unshift(['Plugin', 'Problem']);

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
