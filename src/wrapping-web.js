'use strict';
//captures files and returns parseable chunks
const Finder = require('fs-finder');
const _ = require("lodash");
const fs = require("fs");

class WrappingWeb {
	static find(config) {
		let files = _.flatMap(config.files, fpath => Finder.from(config.directory)
			.exclude(config.exclude)
			.filter(function (stat, path) {
				return !!path.match(new RegExp(fpath));
			})
			.findFiles());
		// console.log(files);
		return function* fileWalk(items) {
			let l = items.length;
			while (l--) {
				// console.log(items[l]);
				yield {
					name: items[l],
					content: fs.readFileSync(items[l])
				};
			}
		}(files);
	}
}

module.exports = WrappingWeb;