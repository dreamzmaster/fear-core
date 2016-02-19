'use strict';

var exec       = require('child_process').exec;
var concurrent = require('./concurrent');
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
     * user messages
     * @see module:utils/install/messages
     */
    messages: require('./messages'),

    installPath : '',

    appDependencies : {},

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
     * setInstallPath
     * @returns {void}
     */
    setInstallPath : function () {
        this.installPath = path.normalize(path.join(__dirname, '../../'));
        process.chdir(this.installPath);
    },

    /**
     * getInstallPath
     * @returns {string}
     */
    getInstallPath : function () {
        return this.installPath;
    },

    /**
     * installFearDependencies
     * @description Install specified versions Fear core modules. The latest version will be installed if
     * 'latest' is the value specified in package.json
     * @param toInstall
     * @returns {void}
     */
    installFearDependencies : function (toInstall) {

        var dependencies = [];
        var appDependencies = this.getAppDependencies();

        if (!toInstall) {
            return false;
        }

        for (var d in appDependencies) {
            if (appDependencies.hasOwnProperty(d) && toInstall[d].install) {
                dependencies.push(
                    'fear-core-' + d + (appDependencies[d].version !== 'latest'
                            ? '@' + appDependencies[d].version
                            : ''
                    )
                );
            }
        }

        this.npmInstall(dependencies);
    },

    /**
     * npmInstall
     * @param dependencies {Array}
     * @returns {void}
     */
    npmInstall : function (dependencies) {

        this.messages.start();
        this.setInstallPath();

        var _self = this;

        function installDependencies(cmd, packages) {
            concurrent(packages, function (module) {
                exec(cmd + module, function () {
                    _self.messages.module(module);
                });
            }, function (error) {
                if (error) {
                    _self.messages.error(error);
                }
            });
        }

        installDependencies('npm install ', dependencies);
    },

    /**
     * getModuleInstallationConfig
     * @description Decorate the fear dependencies object in application package.json with flag to say if each module
     * should be installed or not based on supplied argument of comma delimited module names.
     * @param requestedModules {String}
     * @returns {Object|Boolean}
     */
    getModuleInstallationConfig : function (requestedModules) {

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
                    'install' : requestedModulesArray.indexOf(d) > -1 || !requestedModules,
                    'tasks': appDependencies[d].tasks
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

        this.setInstallPath();

        var fs = require('../fs');

        fs.write(
            fs.template(path.join(this.getInstallPath(), 'defaults/gulpfile.tpl'), {
                'modules' : modules,
                'each' : require('lodash/collection/each')
            }),
            path.join(appRoot.path, 'gulpfile.js')
        );
    }
};
