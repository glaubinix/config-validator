require('colors');

var fs = require('fs'),
	extend = require('extend'),
	jsdiff = require('diff');

if (4 !== process.argv.length) {
	throw new Error("usage: node index.js path/to/config path/to/project/file");
}

// read config file
var config = require(process.argv[2]);


// read all js files and store config usage
var projectConfig = {};
fs.readFile(process.argv[3], function (err, data) {
	if (err) return console.error(err);

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

		projectConfig = extend(true, projectConfig, configEntry);
	}

	// compare and output the diff, show unused config entries and not in config file
	var diff = jsdiff.diffChars(JSON.stringify(config, null, 4), JSON.stringify(projectConfig, null, 4));
	diff.forEach(function (part) {
		// green for additions, red for deletions
		// grey for common parts
		var color = part.added ? 'green' :
			part.removed ? 'red' : 'grey';
		process.stderr.write(part.value[color]);
	});
});
