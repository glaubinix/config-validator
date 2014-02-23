var extend = require('extend');

var STATUS_NOT_FOUND = -1;
var STATUS_NOT_USED = 1;

function getKeys(obj) {
	var keys;
	if (obj.keys) {
		keys = obj.keys();
	} else {
		keys = [];

		for (var k in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, k)) {
				keys.push(k);
			}
		}
	}

	return keys;
}

function prepareConfig(config) {
	var keys = getKeys(config).sort();
	for (var i = 0; i < keys.length; i++) {
		if (typeof config[keys[i]] == 'object' && Object.prototype.toString.call(config[keys[i]]) !== '[object Array]') {
			config[keys[i]] = prepareConfig(config[keys[i]]);
		} else {
			config[keys[i]] = true;
		}
	}

	return config;
}

function compareObjects(a, b, level) {
	var aKeys = getKeys(a),
		bKeys = getKeys(b),
		result = {},
		keyLevel;

	for (var i = 0; i < aKeys.length; i++) {
		keyLevel = level ? level + '.' + aKeys[i] : aKeys[i];
		if (!b.hasOwnProperty(aKeys[i])) {
			result[keyLevel] = STATUS_NOT_FOUND;
		} else if (typeof a[aKeys[i]] === 'object') {
			result = extend(true, result, compareObjects(a[aKeys[i]], b[aKeys[i]], keyLevel));
		}
	}

	for (var j = 0; j < bKeys.length; j++) {
		keyLevel = level ? level + '.' + bKeys[j] : bKeys[j];
		if (!a.hasOwnProperty(bKeys[j])) {
			result[keyLevel] = STATUS_NOT_USED;
		}
	}

	return result;
}

module.exports = {
	diffConfig: function (original, projectConfig) {
		original = prepareConfig(original);
		projectConfig = prepareConfig(projectConfig);

		return compareObjects(original, projectConfig, '');
	},
	STATUS_NOT_FOUND: 1,
	STATUS_NOT_USED: 2
};
