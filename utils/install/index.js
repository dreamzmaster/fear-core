'use strict';

var exec       = require('child_process').exec;
var concurrent = require('./concurrent');
var path = require('path');
var appRoot = require('app-root-path');

/**
 * @module utils/install
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
     * @description Install Fear core versioned modules
     * @param toInstall
     * @returns {boolean}
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
     * @description workout which modules can be installed  based on command line flags.
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
