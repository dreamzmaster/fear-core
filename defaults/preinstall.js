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

function getModulesToInstall () {

    var newModules = [];
    var requestedModulesArray = [];

    if (utils.install.npm.getFearCliArguments()) {
        requestedModulesArray = utils.install.npm.getFearCliArguments().split(',');

        //create array of any requested modules that are not yet installed
        for (var d in requestedModulesArray) {
            if (requestedModulesArray.hasOwnProperty(d) && !isCoreDependencyInstalled(requestedModulesArray[d])) {
                newModules.push(requestedModulesArray[d]);
            }
        }
    }

    return newModules;
}

if(isCoreInstalled()) {

    var installedDeps;
    var newModules;
    var allDeps;

    utils.install.npm.setInstallPath();

    installedDeps = utils.application.getInstalledModules();

    newModules = getModulesToInstall();

    //combine already installed modules and newly installed modules
    allDeps = installedDeps.concat(newModules);

    //generate gulpfile from combined modules above
    utils.install.createGulpFile(utils.install.decorateInstallationConfig(allDeps.join(',')));

    //update dependencies already installed
    if (utils.install.npm.updateCalled()) {
        utils.install.updateFearDependencies(utils.install.decorateInstallationConfig(installedDeps.join(',')));
    }

    //install modules from array created above
    if (utils.install.npm.installCalled()) {
        utils.install.installFearDependencies(utils.install.decorateInstallationConfig(newModules.join(',')));
    }
}