'use strict';

var path = require('path');
var appRoot = require('app-root-path');

/**
 * @module utils/install
 * @description custom installation of module listed in fear section of parent applications package.json. This
 * provides finer control of what modules are installed instead of the (at time of writing) restricting --production
 * flag that is built into npm that will only differentiate between installation of all or production only dependencies.
 * This is insufficient for an SDK where tools provided are for different parts of the development or CI lifecycle
 * and hence will want be installed and used independently of each other
 */
module.exports = {

    /**
     * npm messages
     * @see module:utils/install/npm
     */
    npm: require('./npm'),

    appDependencies : {},

    FEAR_MODULE_PREFIX : 'fear-core-',

    /**
     * setAppDependencies
     * @param dependencies
     * @returns {void}
     */
    setAppDependencies : function (dependencies) {
        this.appDependencies = dependencies;
    },

    /**
     * getAppDependencies
     * @returns {Object}
     */
    getAppDependencies : function () {
        return this.appDependencies;
    },

    /**
     * installFearDependencies
     * @description get config to install specified versions Fear core modules. The latest version will
     * be installed if 'latest' is the value specified in package.json
     * @param modules {Object}
     * @param condition {Function}
     * @returns {Array}
     */
    getInstallConfig : function (modules, condition) {

        var dependencies = [];
        var appDependencies = this.getAppDependencies();

        if (!modules) {
            return;
        }

        for (var d in appDependencies) {
            if (appDependencies.hasOwnProperty(d) && condition.apply(this, [modules[d], d])) {
                dependencies.push(
                    this.FEAR_MODULE_PREFIX + d + (appDependencies[d].version !== 'latest'
                            ? '@' + appDependencies[d].version
                            : ''
                    )
                );
            }
        }

        return dependencies;
    },

    /**
     * installFearDependencies
     * @description Install specified versions Fear core modules.
     * @param modules
     * @returns {void}
     */
    installFearDependencies : function (modules) {
        var dependencies = this.getInstallConfig(modules, function (moduleConfig) {
            return moduleConfig.install;
        });

        if (dependencies.length) {
            this.npm.execute('install', dependencies, 'install');
        }
    },

    /**
     * updateFearDependencies
     * @description Install specified versions Fear core modules.
     * @param modules
     * @returns {void}
     */
    updateFearDependencies : function (modules) {
        var dependencies = this.getInstallConfig(modules, function (moduleConfig, moduleName) {
            return moduleConfig.install && this.isNewerVersion(moduleConfig.version, this.getInstalledModuleVersion(moduleName));
        });

        if (dependencies.length) {
            this.npm.execute('install', dependencies, 'update');
        }
    },

    /**
     * getInstalledModuleVersion
     * @param moduleName
     * @returns {*}
     */
    getInstalledModuleVersion : function (moduleName) {
        try {
            require(this.FEAR_MODULE_PREFIX + moduleName);
            return require(path.join(this.FEAR_MODULE_PREFIX + moduleName, 'package.json')).version;
        } catch (e) {
            return false;
        }
    },

    /**
     * isNewerVersion
     * @param installedVersion
     * @param version
     * @returns {boolean}
     */
    isNewerVersion : function (installedVersion, version) {

        if (!version) {
            return false;
        }

        return installedVersion.replace(/\./g, '') > version.replace(/\./g, '');
    },

    /**
     * getModuleInstallationConfig
     * @description Decorate the fear dependencies object in application package.json with flag to say if
     * each module should be installed or not based on supplied argument of comma delimited module names.
     * @param requestedModules {String}
     * @returns {Object|Boolean}
     */
    decorateInstallationConfig : function (requestedModules) {

        var requestedModulesArray = [];
        var fearAvailableModules = {};
        var appDependencies = this.getAppDependencies();

        if (!appDependencies) {
            return false;
        }

        if (requestedModules) {
            requestedModulesArray = requestedModules.split(',');
        }

        for (var d in appDependencies) {
            if (appDependencies.hasOwnProperty(d)) {
                fearAvailableModules[d] = {
                    'install' : requestedModulesArray.indexOf(d) > -1,
                    'tasks': appDependencies[d].tasks,
                    'version' : appDependencies[d].version
                };
            }
        }

        return fearAvailableModules;
    },

    /**
     * createGulpFile
     * @param modules
     * @returns {void}
     */
    createGulpFile : function (modules) {

        this.npm.setInstallPath();

        var fs = require('../fs');

        fs.write(
            fs.template(path.join(this.npm.getInstallPath(), 'defaults/gulpfile.tpl'), {
                'modules' : modules,
                'each' : require('lodash/collection/each')
            }),
            path.join(appRoot.path, 'gulpfile.js')
        );
    }
};
