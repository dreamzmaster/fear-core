'use strict';

var chalk = require('chalk');
var notify = require('../notify');

/**
 * @module utils/install/messages
 */
module.exports = {

    /**
     * start
     * @param action {String}
     * @param dependencies {Array}
     * @returns {void}
     */
    start : function (action, dependencies) {

        var message = action.charAt(0).toUpperCase() + action.slice(1) + ': ' + dependencies.join(',');

        notify.log(chalk.cyan('\n' + message + ' FEAR NPM dependencies:\n\n'));
    },

    /**
     * module
     * @param module {String}
     * @returns {void}
     */
    module : function (module) {
        notify.log('module: ' + chalk.green(module + '\n'));
    },

    /**
     * error
     * @param error {Object}
     * @returns {void}
     */
    error : function (error) {
        notify.log(chalk.red(error));
    }
};