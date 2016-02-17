'use strict';

/**
 * currently this script is experimental
 */

function isCoreInstalled () {
    try {
        require('fear-core');
        return true;
    } catch (e) {
        return false;
    }
}

function isCoreDependencyInstalled (moduleName) {
    return !!require('fear-core')[moduleName];
}

if(isCoreInstalled()) {

    var fearDeps = require('./package.json').fear;
    var requestedModulesArray = [];

    if (process.env.npm_config_fear) {
        requestedModulesArray = process.env.npm_config_fear.split(',');
    }

    for (var d in requestedModulesArray) {
        if(!isCoreDependencyInstalled(requestedModulesArray[d])) {
            require('fear-core').utils.install.installFearDependencies(
                fearDeps, require('fear-core').utils.install.getAvailableFearModules(fearDeps, requestedModulesArray[d])
            );
        }
    }
}

