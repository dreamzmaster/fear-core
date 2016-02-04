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
     * @returns fearAvailableModules {Object}
     */
    getAvailableFearModules : function (fearDeps) {

        var fearAvailableModules = {};

        for (var d in fearDeps.dependencies) {
            if (fearDeps.dependencies.hasOwnProperty(d)) {
                fearAvailableModules[d] = {
                    'install' : process.env.npm_config_fear === d || !process.env.npm_config_fear,
                    'tasks': fearDeps.dependencies[d].tasks
                };
            }
        }

        return fearAvailableModules;
    }
};