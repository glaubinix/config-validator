require('colors');

var jsdiff = require('./diff'),
	project = require('./project');

module.exports = function (configPath, projectPath) {
	var config = require(configPath);

	project(projectPath, function (projectConfig) {
		var configDiff = jsdiff.diffConfig(config, projectConfig);
		for (var i in configDiff) {
			var color = configDiff[i] == jsdiff.STATUS_NOT_FOUND ? 'red' : 'green';
			var indicator = configDiff[i] == jsdiff.STATUS_NOT_FOUND ? '--' : '++';

			console.log(indicator[color], i[color]);
		}
	});
};
