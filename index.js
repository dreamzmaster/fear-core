'use strict';

var appRoot = require('app-root-path');
var utils = require('./utils');
var fearDeps = require(appRoot + '/package.json').fear;

var d, fearModules = [];

var fearAvailableModules = utils.install.getAvailableFearModules(fearDeps);

for (d in fearAvailableModules) {
    if (fearDeps.dependencies.hasOwnProperty(d) && fearAvailableModules[d].install) {
        fearModules[d] = require('fear-core-' + d);
    }
}

/**
 * @module fear-core
 */
module.exports = fearModules;

module.exports.serve = require('fear-core-serve');

/**
 * utils
 * @see module:utils
 */
module.exports.utils = require('./utils');
