'use strict';
var argv = require('minimist')(process.argv.slice(2));

const ww = require("./wrapping-web.js");
const proc = require("./processor.js");
const alias = require("./alias.js");
const output = require("./output.js");


class Spider {
	static catchSomeCode(config) {
		proc.configure(config)
			.process(ww.find(config))
			.pipe(alias)
			.pipe(output);
	}
}


module.exports = Spider;