
// the main execution engine
// this file is passed the final rules and config to run against
// 1. report - this is akin to the eslint verify
// 2. repair - if the user chooses to --fix, we will tell the plugins to fix any mistakes they find when report runs
// this will return an object of all the results
