'use strict';

/**
 * This script is added to parent application to resolve the problem that if fear-core is already installed and hence
 * in the npm cache it will not install child modules, even if they are not present. With this pre-install script the
 * existing fear-core dependencies are examined and if a dependency is requested that is missing it will be installed.
 * If a new module is installed then the gulpfile is updated accordingly so existing and newly installed modules are
 * available to gulp.
 *
 * @TODO this script and fear-core module can be further updated to take versioning into account.
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

    var utils = require('fear-core').utils;
    var requestedModulesArray = [];
    var newModules = [];

    if (process.env.npm_config_fear) {
        requestedModulesArray = process.env.npm_config_fear.split(',');
    }

    //create array of any requested modules that are not yet installed
    for (var d in requestedModulesArray) {
        if(requestedModulesArray.hasOwnProperty(d) && !isCoreDependencyInstalled(requestedModulesArray[d])) {
            newModules.push(requestedModulesArray[d]);
        }
    }

    utils.install.setInstallPath();

    //combine already installed modules and newly installed modules
    var allDeps = utils.application.getInstalledModules().concat(newModules);

    //generate gulpfile from combined modules above
    utils.install.createGulpFile(utils.install.getModuleInstallationConfig(allDeps.join(',')));

    //install modules from array created above
    utils.install.installFearDependencies(utils.install.getModuleInstallationConfig(newModules.join(',')));
}