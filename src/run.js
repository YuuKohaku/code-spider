'use strict';
const spider = require("./spider.js");
const redbird = require("redbird");
const _ = require("lodash");
var argv = require('minimist')(process.argv.slice(2));
var config = require(argv.config);
spider.catchSomeCode(config)
var result = _.groupBy(require("../app/data/output.json")
	.source, "module_name");
var express = require('express')
var app = express()
app.use(express.static("app"));

app.get('/', function (req, res) {
	let resp = req.query.q ? result[req.query.q] : result;
	res.send('<html><head></head><body><pre>' + JSON.stringify(resp, undefined, '\t')) + '</pre></body></html>';
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})