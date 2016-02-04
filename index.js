'use strict';

var appRoot = require('app-root-path');
var utils = require('./utils');
var fearDeps = require(appRoot + '/package.json').fear;

var d, fearModules = [];

var fearAvailableModules = utils.install.getAvailableFearModules(fearDeps);

for (d in fearAvailableModules) {
    if (fearDeps.dependencies.hasOwnProperty(d)) {
        try {
            var module = require('fear-core-' + d);
            fearModules[d] = module;
        } catch (err) {}
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
