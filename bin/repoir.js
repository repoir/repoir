#!/usr/bin/env node

// This file merely passes cli args to the src/cli.js

const program = require('commander');

program
.version(require('../package.json').version)
.option('-f, --fix', 'Apply fixes where possible')
.option('-c, --config [file]', 'The ruleset config', `${process.cwd()}/.repoir`)
.parse(process.argv);

require('../dist/cli').default(program);
