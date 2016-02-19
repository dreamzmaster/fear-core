'use strict';

var exec       = require('child_process').exec;
var concurrent = require('./concurrent');
var path = require('path');
var appRoot = require('app-root-path');
var application = require('../application');

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
     * Install Fear core versioned modules
     * @param toInstall
     * @returns {boolean}
     */
    installFearDependencies : function (toInstall) {

        var dependencies = [];
        var fearDeps = application.getApplicationDependencies();

        if (!toInstall) {
            return false;
        }

        for (var d in fearDeps.dependencies) {
            if (fearDeps.dependencies.hasOwnProperty(d) && toInstall[d].install) {
                dependencies.push(
                    'fear-core-' + d + (fearDeps.dependencies[d].version !== 'latest'
                            ? '@' + fearDeps.dependencies[d].version
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
        var fearDeps = application.getApplicationDependencies();

        if (!fearDeps) {
            return false;
        }

        if (requestedModules) {
            requestedModulesArray = requestedModules.split(',');
        }

        for (var d in fearDeps.dependencies) {
            if (fearDeps.dependencies.hasOwnProperty(d)) {
                fearAvailableModules[d] = {
                    'install' : requestedModulesArray.indexOf(d) > -1 || !requestedModules,
                    'tasks': fearDeps.dependencies[d].tasks
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
            fs.template(path.join(this.getInstallPath, 'defaults/gulpfile.tpl'), {
                'modules' : modules,
                'each' : require('lodash/collection/each')
            }),
            path.join(appRoot.path, 'gulpfile.js')
        )
    }
};
