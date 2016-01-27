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
    }
};