#!/usr/bin/env node

var validator = require('../lib/index');

if (4 !== process.argv.length) {
	throw new Error("usage: node index.js path/to/config path/to/project");
}

validator(process.argv[2], process.argv[3]);

