const spider = require("./spider.js");
var config = require("../config/spider-config.js");
module.exports = spider.catchSomeCode(config);