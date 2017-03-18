
# Repoir

Repoir = Repository report and repair 

This project follows the eslint pattern in that you will be able ot create your own ruleset and plugins to run against your repos to ensure they confirm to your specific needs. Sure, there are a decent amount of plugins, but this project is really about creating a harness for your own twisted shackles. 

## install

```bash
npm i -g repoir
```

## usage

```bash
repoir
```

To get help with cli uage, run the following.

```bash
repoir --help
```

## configuration 

There are three main ways to configure repoir. 

#. You can provide __plugins__ which establish new rules.
#. You can configure __rules__ that are provided by plugins. 
#. You can __extend__ the configuration.

### plugins

Repoir is based entirely off __plugins__. Without plugins, repoir does nothing.

Plugins should follow the npm naming convention of __repoir-plugin-{name}__.

To enable new plugins, you can add them to the plugins array in the configuration file. 

```json 
"plugins": [
	"npm-scripts",
	"package-json-order"	
]
```

The interface to define your own plugin. 

```javascript
export const meta = {
    description: "lorem ipsum"
}

export const schema = {
    // schema for config options in .repoir.json
    // json schema?
}

export function test (options) {
    return new Promise((resolve, reject) => {
        // return a resolved or rejected promise to indicate status
        // somehow report messages
    });
}

export function fix (options) {
    return new Promise((resolve, reject) => {

    });
}
```

### rules

Plugins are configured via ___rules__. If you don't define a ruleset for a plugin to follow, it will follow its default set. 

### extend

Finally, 

```

```

### ruleset

Rulesets are used by repoir to configure how it scans a project. 

To provide your own ruleset, pass in a file with -r or --ruleset or place a .repoir config file in your project's root. 


## plugins

### write your own


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
