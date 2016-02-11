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
     * npm
     * @param dependencies {Array}
     */
    npm : function (dependencies) {

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

        installDependencies('npm install ', dependencies, 'devDependencies');
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