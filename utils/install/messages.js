'use strict';

var chalk = require('chalk');
var notify = require('../notify');

/**
 * @module utils/fs/messages
 */
module.exports = {

    /**
     * start
     * @returns {void}
     */
    start : function () {
        notify.log(chalk.cyan('\nInstalling FEAR NPM dependencies:\n\n'));
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