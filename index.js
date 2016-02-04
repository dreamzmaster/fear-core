'use strict';

var appRoot = require('app-root-path');
var utils = require('./utils');
var fearDeps = require(appRoot + '/package.json').fear;

var fearAvailableModules = utils.install.getAvailableFearModules(fearDeps, process.env.npm_config_fear);

for (var d in fearAvailableModules) {
    if (fearDeps.dependencies.hasOwnProperty(d)) {
        try {
            var fearModule = require('fear-core-' + d);
            module.exports[d] = fearModule;
        } catch (err) {}
    }
}

module.exports.serve = require('fear-core-serve');

/**
 * utils
 * @see module:utils
 */
module.exports.utils = require('./utils');
