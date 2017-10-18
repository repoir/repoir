# Repoir [![Build Status](https://travis-ci.org/repoir/repoir.svg?branch=master)](https://travis-ci.org/repoir/repoir) [![Coverage Status](https://coveralls.io/repos/github/repoir/repoir/badge.svg?branch=master)](https://coveralls.io/github/repoir/repoir?branch=master) [![dependencies Status](https://david-dm.org/repoir/repoir/status.svg)](https://david-dm.org/repoir/repoir)

<br>

![Repoir](https://raw.githubusercontent.com/repoir/repoir/master/media/repoir-logo.png)

Repoir = Repository report and repair

In the real world, developers are opinionated, forgetful, and tend to overthink basic file organization. Multiple this by x repositories and y developers and clouds of sadness rain down. Repoir is here to help. It's simple. Configure repoir. Run repoir to find issues. Run repoir --fix to fix issues. Then get back to coding something your future self will be proud of.

Repoir follows a plug-in architectue to allow you to re-use, create, and / or configure your own repository ruleset.

## install

```bash
npm i -g repoir
```

## usage

```bash
repoir
```

To fix issues.

```bash
repoir -f
repoir --fix
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
	"json-schema",
	"package-organizer"
]
```

The interface to define your own plugin.

```javascript
export const schema = {
    // JSON schema for config options in .repoir.json
}

export function test (options) {
    return new Promise((resolve, reject) => {
        // Resolve with a list of problems found
        resolve([
            { message: 'there was a problem' }
        ]);

        // Or reject with an Error. Note: Only reject if
        // there was an internal issue, not with problems
        // intended for your plugin to find
        reject(new Error('internal error'));
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
