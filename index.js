'use strict';

var fearDeps = require('./package.json').fear;

var fearModules = {};

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