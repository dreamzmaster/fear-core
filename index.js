'use strict';

var appRoot = require('app-root-path');

var fearDeps = require(appRoot + '/package.json').fear;

var d;

for (d in fearDeps.dependencies) {
    if (fearDeps.dependencies.hasOwnProperty(d)) {
        fearModules[d] = require('fear-core-' + d);
    }
}

for (d in fearDeps.devDependencies) {
    if (fearDeps.devDependencies.hasOwnProperty(d)) {
        fearModules[d] = require('fear-core-' + d);
    }
}

/**
 * @module fear-core
 */
module.exports = fearModules;

/**
 * utils
 * @see module:utils
 */
module.exports.utils = require('./utils');
