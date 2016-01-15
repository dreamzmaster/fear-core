'use strict';

var appRoot = require('app-root-path');

var fearDeps = require(appRoot + '/package.json').fear;

var fearModules = {
    config  : require('./utils/config')
};

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

module.exports = fearModules;
