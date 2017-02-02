'use strict';

const GeneralProcessor = require("./general-processor.js");
const path = require("path");
const _ = require("lodash");

class Alias extends GeneralProcessor {
	process(link_results) {
		let result = this._alias(link_results);
		super.process(result);
		return this;
	}

	_alias(data) {
		let links = _.flatMap(data, 'links'),
			l = links.length,
			curr, pt;
		while (l--) {
			curr = links[l];
			if (!curr.receiver)
				continue;
			// console.log(curr);
			pt = _.find(this._cfg.alias, v => !!v.matches.test(curr.receiver));
			// console.log(pt);
			if (!pt)
				continue;
			// curr.receiver = path.relative(this._cfg.directory, curr.receiver);
			// console.log(curr.receiver.match(pt.name_parts));
			curr.receiver = curr.receiver.match(pt.name_parts)
				.slice(1, 3);
			curr.receiver = _.flatMap(curr.receiver, v => v.split(pt.split))
				.join(pt.join);
		}

		l = links.length;
		while (l--) {
			curr = links[l];
			if (!curr.module)
				continue;
			// console.log(curr);
			pt = _.find(this._cfg.alias, v => !!v.matches.test(curr.module));
			// console.log(pt);
			if (!pt)
				continue;
			// curr.receiver = path.relative(this._cfg.directory, curr.receiver);
			// console.log(curr.receiver.match(pt.name_parts));
			curr.module_name = curr.module.match(pt.name_parts)
				.slice(1, 3);
			curr.module_name = _.flatMap(curr.module_name, v => v.split(pt.split))
				.join(pt.join);
		}

		l = data.length;
		while (l--) {
			curr = data[l];
			// console.log(curr);
			pt = _.find(this._cfg.alias, v => !!v.matches.test(curr.name));
			// console.log(pt);
			if (!pt)
				continue;
			// curr.receiver = path.relative(this._cfg.directory, curr.receiver);
			// console.log(curr.receiver.match(pt.name_parts));
			curr.module_name = curr.name.match(pt.name_parts)
				.slice(1, 3);
			curr.module_name = _.flatMap(curr.module_name, v => v.split(pt.split))
				.join(pt.join);
		}
		return data;
	}
}

module.exports = new Alias();