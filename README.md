
# Repoir

Repoir = Repository report and repair tool. 

This project will mimic eslint in the sense that you will be able ot create your own ruleset and plugins to run against your repos to ensure they confirm to your specific needs. Sure, there are a decent amount of plugins, but this project is really about creating a harness for your own twisted shackles. 

## install

`
npm i -g repoir
`

## usage

`
repoir
`

## api

You use repoir in two ways. 
First, you can create or extend the ruleset. 
Second, you can provide your own plugins that will run with other plugins based on your ruleset. 

### ruleset

Rulesets are used by repoir to configure how it scans a project. 

To provide your own ruleset, pass in a file with -r or --ruleset or place a .repoir config file in your project's root. 


## plugins

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
