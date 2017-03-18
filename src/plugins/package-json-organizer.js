
export const meta = {
	key: 'package-json-organizer',
	description: 'This will organize your package.json.'
};

export const schema = {
    // schema for config options in .repoir.json
    // json schema?
};

export const defaultConfig = {
	order: [
		'name',
		'version',
		'description',
		'main',
		'bin',
		'scripts',
		'dependencies',
		'devDependencies',
		'...'
	]
};

export function test (ruleConfig) {
	return new Promise((resolve, reject) => {
		const pkg = require(`${process.cwd()}/package.json`);
		const pkgKeys = Object.keys(pkg);
		const sortedKeys = sort(pkgKeys);
		if (isSameOrder(pkgKeys, sortedKeys)) {
			return resolve({ error: false });
		}
		return resolve({ error: true, message: 'package.json not properly ordered'});
	});
}

export function fix (ruleConfig) {
	return new Promise((resolve, reject) => {
		const pkg = require(`${process.cwd()}/package.json`);
		const pkgKeys = Object.keys(pkg);
		const sortedKeys = sort(pkgKeys);
		if (isSameOrder(pkgKeys, sortedKeys)) { // if already matching, let it be
			return resolve({ fixed: false });
		}
		const sortedPkg = sortObjectByKeyNameList(pkg, sortedKeys);
		console.log(sortedPkg)
		return resolve({ fixed: true });
	});
}

function sort (pkgKeys) {
	const sortedKeys = JSON.parse(JSON.stringify(pkgKeys)).sort();
	defaultConfig.order.reverse().forEach( overrideSortKey => {
		if (overrideSortKey === '...') return;
		move(sortedKeys, sortedKeys.indexOf(overrideSortKey), 0);
	});
	return sortedKeys;
}

function sortObjectByKeyNameList(object, sortWith) {
  var keys;
  var sortFn;

  if (typeof sortWith === 'function') {
    sortFn = sortWith;
  } else {
    keys = sortWith;
  }
  return (keys || []).concat(Object.keys(object).sort(sortFn)).reduce(function(total, key) {
    total[key] = object[key];
    return total;
  }, Object.create(null));
}

function move (array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
}

function isSameOrder (array1, array2) {
	return array1.length === array2.length && array1.every((v,i)=> v === array2[i]);
}