require('colors');

var jsdiff = require('diff'),
	project = require('./lib/project');

if (4 !== process.argv.length) {
	throw new Error("usage: node index.js path/to/config path/to/project");
}

// read config file
var config = require(process.argv[2]);


// read all js files and store config usage
project(process.argv[3], function (projectConfig) {
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
