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

    var coreModule = require('fear-core');

    var fearDeps = require('./package.json').fear;
    var requestedModulesArray = [];

    if (process.env.npm_config_fear) {
        requestedModulesArray = process.env.npm_config_fear.split(',');
    }

    for (var d in requestedModulesArray) {
        if(!isCoreDependencyInstalled(requestedModulesArray[d])) {
            coreModule.utils.install.installFearDependencies(
                fearDeps, coreModule.utils.install.getAvailableFearModules(fearDeps, requestedModulesArray[d])
            );
        }
    }

    coreModule.utils.fs.write(
        coreModule.utils.fs.template('node_modules/fear-core/defaults/gulpfile.tpl', {
            'modules' : coreModule.utils.install.getAvailableFearModules(fearDeps, requestedModulesArray[d]),
            'each' : require('./node_modules/fear-core/node_modules/lodash/collection/each')
        }),
        './gulpfile.js'
    );
}