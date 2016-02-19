'use strict';

var fs = require('fs');

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

    var requestedModulesArray = [];
    var newModules = [];
    var moduleObject;

    if (process.env.npm_config_fear) {
        requestedModulesArray = process.env.npm_config_fear.split(',');
    }

    for (var d in requestedModulesArray) {
        if(requestedModulesArray.hasOwnProperty(d) && !isCoreDependencyInstalled(requestedModulesArray[d])) {

            moduleObject = coreModule.utils.install.getModuleInstallationConfig(requestedModulesArray[d]);

            coreModule.utils.install.installFearDependencies(moduleObject);

            newModules.push(requestedModulesArray[d]);
        }
    }

    var existingModules = coreModule.utils.install.getInstalledModules(fearDeps);

    var allDeps = newModules.concat(existingModules);

    coreModule.utils.install.createGulpFile(coreModule.utils.install.getModuleInstallationConfig(allDeps.join(',')));
}
