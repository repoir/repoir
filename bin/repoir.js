#!/usr/bin/env node

// this file merely passes cli args to the src/cli.js

var program = require('commander');

program
    .version(require('../package.json').version)
	.option('-f, --fix', 'Apply fixes where possible')
    .option('-r, --ruleset [file]', 'The ruleset config')
    .parse(process.argv);

require('../dist/cli').default(program);
