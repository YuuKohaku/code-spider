'use strict';

const GeneralProcessor = require("./general-processor.js");
const path = require("path");
const _ = require("lodash");

class Processor extends GeneralProcessor {

	process(file_gen) {
		let search_results = [];
		for (var i of file_gen) {
			i.links = this._findLinks(i.name, i.content);
			search_results.push(i);
		}
		this._discoverModules(search_results);

		super.process(search_results);
		return this;
		// console.log(require('util')
		// 	.inspect(search_results, {
		// 		depth: null
		// 	}));
	}

	_findLinks(filename, file_content) {
		// console.log(filename);
		// console.log(file_content.toString());
		let str = file_content.toString();
		return _.flatMap(this._cfg.links, l_desc => {
			let re = l_desc.exp,
				st = true,
				res = [],
				fmt = _.reduce(l_desc.format.split("."), (acc, v, i) => {
					acc[v] = i + 1;
					return acc;
				}, {});

			while (st = re.exec(str)) {
				//linktype (module method || emit_addr)
				// st && console.log(st[1], st[2], st[3]);
				if (!st)
					continue;
				res.push({
					"receiver": fmt["module"] && st[fmt["module"]],
					"module": filename,
					"method": fmt["method"] && st[fmt["method"]],
					"type": l_desc.name,
					"anchor": l_desc.anchor
				});
			}
			return res;
		});
	}

	_discoverModules(sr = []) {
		let links_reg = _.flatMap(sr, 'links'),
			l = links_reg.length,
			curr_sr;
		while (l--) {
			curr_sr = links_reg[l];
			if (!curr_sr.receiver && curr_sr.anchor) {
				curr_sr.receiver = _.get(_.find(links_reg, v => (v.type == curr_sr.anchor && v.method == curr_sr.method)), 'module');
			}
		}
	}
}

module.exports = new Processor();