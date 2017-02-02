'use strict';

const GeneralProcessor = require("./general-processor.js");
const _ = require("lodash");
const fs = require("fs");

class Output extends GeneralProcessor {
	process(data) {
		// console.log(_.filter(links, l => l.module_name == 'queue'));

		let result = this._format(data);
		super.process(result);
		fs.writeFileSync("./app/data/output.json", JSON.stringify(result))
		return this;
	}

	_format(data) {
		let links = _.flatMap(data, 'links');
		// console.log(data);
		data = _.keyBy(data, 'module_name');
		let lbm = _.filter(_.uniq(_.flatMap(links, l => [l.receiver, l.module_name]))),
			km = {};
		console.log(lbm);
		let vertices = _.map(lbm, (k, i) => {
			km[k] = 'n' + i;
			return {
				id: 'n' + i,
				label: k,
				x: Math.cos(i / lbm.length * 2 * Math.PI) * 5000,
				y: Math.sin(i / lbm.length * 2 * Math.PI) * 5000,
				color: !data[k] || data[k].links.length ? "#4B0082" : "#66CDAA",
				size: 1
			}
		});
		let edges = _.map(_.filter(links, l => !!l.receiver), (l, i) => ({
			id: 'e' + i,
			source: km[l.module_name],
			target: km[l.receiver],
			link: l,
			label: l.method,
			color: "#1E90FF",
			size: 0.1,
			type: km[l.module_name] != km[l.receiver] ? "arrow" : "curvedArrow"
		}));
		return {
			nodes: vertices,
			edges: edges,
			source: links
		};
	}
}

module.exports = new Output();