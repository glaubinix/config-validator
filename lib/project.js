var file = require('file'),
	fs = require('fs'),
	extend = require('extend');

function getConfigFromFile(file) {
	var fileConfig = {};

	var data = fs.readFileSync(file);
	var result = data.toString().match(/config\.[a-zA-Z0-9\_\.]+/g);

	var entry,
		length,
		configEntry,
		temporaryConfig;

	for (var i in result) {
		entry = result[i].split(/\./);
		configEntry = {};
		length = entry.length;

		for (var j = 0; j < entry.length; j++) {
			if (0 === j) {
				temporaryConfig = configEntry;
			} else {
				temporaryConfig[entry[j]] = j + 1 === length ? true : {};
				temporaryConfig = temporaryConfig[entry[j]];
			}
		}

		fileConfig = extend(true, fileConfig, configEntry);
	}

	return fileConfig;
}

module.exports = function (path, callback) {

	var projectConfig = {};
	file.walkSync(path, function (dirPath, dirs, files) {
		if (-1 !== dirPath.indexOf('.git') || -1 !== dirPath.indexOf('node_modules')) {
			return;
		}

		for (var i in files) {
			if (files[i].indexOf('.js', files[i].length - 3) !== -1) {
				projectConfig = extend(true, projectConfig, getConfigFromFile(dirPath + '/' + files[i]));
			}
		}
	});

	callback(projectConfig);
};
