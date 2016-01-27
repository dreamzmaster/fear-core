'use strict';

var chalk = require('chalk');
var notify = require('../notify');

/**
 * @module utils/fs/messages
 */
module.exports = {

    /**
     * copyOk
     * @returns {void}
     */
    log : function () {
        notify.log(chalk.green('Installing FEAR Dependencies:\n\n'));
    },

    /**
     * fileSkipped
     * @param module {String}
     * @returns {void}
     */
    module : function (module) {
        notify.log(chalk.green('module: ' + module));
    },

    /**
     * copyError
     * @param error {Object}
     * @returns {void}
     */
    copyError : function (error) {
        notify.log(chalk.red(error));
    }
};