export function formatAjvError (error, file) {
	let dataPath = error.dataPath;

	if (dataPath[0] === '.') dataPath = dataPath.slice(1);

	switch (error.keyword) {
		case 'required':
			return `${file} ${dataPath ? `'${dataPath}' ` : ''}${error.message}`;
		case 'enum':
			return `${file} '${dataPath}' ${error.message}: ${error.params.allowedValues.map(value => `'${value}'`).join(', ')}`;
		default:
			return `${file} ${error.message}`;
	}
}
