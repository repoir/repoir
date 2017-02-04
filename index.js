#!/usr/bin/env node

var program = require('commander');

program
    .version(require('./package.json').version)
    .option('-r, --ruleset <username>', 'The ruleset config')
    .parse(process.argv);

require('./dist').default(program);
