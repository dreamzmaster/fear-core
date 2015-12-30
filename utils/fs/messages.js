'use strict';

var chalk = require('chalk');
var fearCoreTasks = chalk.cyan('Installing FEAR:');
var notify = require('../notify');

module.exports = {
    copyOk : function (filename) {
        notify.log(fearCoreTasks + ' copied default ' + chalk.green(filename) + ' to project\n');
    },

    fileSkipped : function (filename) {
        notify.log(fearCoreTasks + ' skipped copying default ' + chalk.green(filename) + '\nFile already exists in project\n');
    },

    copyError : function (filename, err) {
        notify.log(fearCoreTasks + chalk.red(' cannot copy ' + filename) + '\nError: ' + err.message + '\n');
    }
};