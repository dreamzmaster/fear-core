'use strict';

/**
 * currently this script is experimental
 */

var utils = require('fear-core').utils;

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

    var requestedModulesArray = [];
    var newModules = [];

    if (process.env.npm_config_fear) {
        requestedModulesArray = process.env.npm_config_fear.split(',');
    }

    for (var d in requestedModulesArray) {
        if(requestedModulesArray.hasOwnProperty(d) && !isCoreDependencyInstalled(requestedModulesArray[d])) {

            utils.install.installFearDependencies(
                utils.install.getModuleInstallationConfig(requestedModulesArray[d])
            );

            newModules.push(requestedModulesArray[d]);
        }
    }

    var existingModules = utils.application.getInstalledModules();

    var allDeps = newModules.concat(existingModules);

    utils.install.createGulpFile(utils.install.getModuleInstallationConfig(allDeps.join(',')));
}
