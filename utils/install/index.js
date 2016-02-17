'use strict';

var exec       = require('child_process').exec;
var concurrent = require('./concurrent');
var install;

module.exports = install = {

    /**
     * user messages
     * @see module:utils/install/messages
     */
    messages: require('./messages'),

    /**
     * Install Fear core versioned modules
     * @param toInstall
     * @returns {boolean}
     */
    installFearDependencies : function (fearDeps, toInstall) {

        var dependencies = [];

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

        install.npmInstall(dependencies);
    },

    /**
     * npm
     * @param dependencies {Array}
     */
    npmInstall : function (dependencies) {

        var installPath = path.normalize(path.join(__dirname, '../../'));

        process.chdir(installPath);

        install.messages.start();

        function installDependencies(cmd, packages) {
            concurrent(packages, function (module) {
                exec(cmd + module, function () {
                    install.messages.module(module);
                });
            }, function (error) {
                if (error) {
                    install.messages.error(error);
                }
            });
        }

        installDependencies('npm install ', dependencies);
    },

    /**
     * getAvailableFearModules
     * @description workout which modules can be installed  based on command line flags.
     * @param fearDeps {Object}
     * @param requestedModules {String}
     * @returns fearAvailableModules {Object|Boolean}
     */
    getAvailableFearModules : function (fearDeps, requestedModules) {

        var requestedModulesArray = [];
        var fearAvailableModules = {};

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
    }
};