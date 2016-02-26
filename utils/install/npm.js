'use strict';

var exec = require('child_process').exec;
var concurrent = require('./concurrent');
var path = require('path');

/**
 * @module utils/install/npm
 */
module.exports = {

    /**
     * messages
     * @see module:utils/install/messages
     */
    messages: require('./messages'),

    installPath : '',

    COMMAND_LINE_KEY : 'npm_config_fear',

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
     * execute
     * @param command {String}
     * @param dependencies {Array}
     * @param action {String}
     * @returns {void}
     */
    execute : function (command, dependencies, action) {

        this.messages.start(action, dependencies);
        this.setInstallPath();

        var _self = this;

        function _npm(cmd, packages) {
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

        _npm('npm ' + command + ' ', dependencies);
    },

    getFearCliArguments : function () {
        return process.env[this.COMMAND_LINE_KEY];
    },

    /**
     * updateCalled
     * @returns {boolean}
     */
    updateCalled : function () {
        return process.env.npm_config_argv.original[0] === 'update';
    },

    /**
     * installCalled
     * @returns {boolean}
     */
    installCalled : function () {
        return process.env.npm_config_argv.original[0] === 'update';
    }
};