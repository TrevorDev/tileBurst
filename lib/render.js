var views = require('co-views');
var sessionHelper = require('./../lib/sessionHelper');
var config = require('./../lib/config');

module.exports = views(__dirname + '/../views', config.templateOptions);