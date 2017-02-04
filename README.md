
# Welcome to Repoir

This tool will help you define a ruleset that you can use to grade, fix, report issues in repos. 

## install

`
npm i -g repoir
`

## usage

### ruleset

Rulesets are used by repoir to configure how it scans a project. 

To provide your own ruleset, pass in a file with -r or --ruleset or place a .repoir config file in your project's root. 


## modules

### dependencies

Dependencies deal with checking the state of modules which are needed for your repo. 

1. check to see if dependencies are out of date
2. check to see if dependencies haven't been installed
3. check to make sure dependencies like webpack, jest, babel are in devDependencies


### lint

For lint checking we want to check the following things. 

1. does npm run lint exist
2. if we run npm run lint, do we get a style report
3. if npm run lint doesn't product a report, does npm run lint:out
4. read the report, are there errors? 
5. ensure an .eslintrc file is present and matches a pre-defined one in the ruleset

### package.json

Will clean up package.json if necessary. 

#### organize

Will alphabetize sort the package.json file and all sub properties. 

#### script checker

This is for checking to make sure some basic npm scripts are in package.json and that they work. 

* build 
* clean
* healthcheck
* lint
* test
* test:coverage


### webpack 

Support for ensuring webpack config is consistent
