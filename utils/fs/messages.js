'use strict';

var chalk = require('chalk');
var fearCoreTasks = chalk.cyan('Installing FEAR application files:');
var notify = require('../notify');

/**
 * @module utils/fs/messages
 */
module.exports = {

    /**
     * copyOk
     * @param filename {String}
     * @returns {void}
     */
    copyOk : function (filename) {
        notify.log(fearCoreTasks + ' copied default ' + chalk.green(filename) + ' to project\n');
    },

    /**
     * fileSkipped
     * @param filename {String}
     * @returns {void}
     */
    fileSkipped : function (filename) {
        notify.log(fearCoreTasks + ' skipped copying default ' + chalk.green(filename) + ' - ' + chalk.yellow('File already exists in project\n'));
    },

    /**
     * copyError
     * @param filename {String}
     * @param error {Object}
     * @returns {void}
     */
    copyError : function (filename, error) {
        notify.log(fearCoreTasks + chalk.red(' cannot copy ' + filename) + '\nError: ' + error.message + '\n');
    }
};