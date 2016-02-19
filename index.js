'use strict';

var utils = require('./utils');

var fearAvailableModules = utils.install.getModuleInstallationConfig(process.env.npm_config_fear);

//make modules available i.e require('fear-core').build works
for (var d in fearAvailableModules) {
    if (fearAvailableModules.hasOwnProperty(d)) {
        try {
            var fearModule = require('fear-core-' + d);
            module.exports[d] = fearModule;
        } catch (err) {
            //cannot throw error here as this needs to fail silently
        }
    }
}

module.exports.serve = require('fear-core-serve');

/**
 * @module fear-core
 */

/**
 * tasks
 * @see module:tasks
 */
module.exports.tasks = require('./tasks');

/**
 * utils
 * @see module:utils
 */
module.exports.utils = require('./utils')();
