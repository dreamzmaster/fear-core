/* eslint no-console: 0 */

'use strict';

var appRoot = require('app-root-path');
console.log('appRoot', appRoot);
var moduleRoot = process.cwd();

var fs = require('fs-extra');
var chalk = require('chalk');

var version = require('../../package.json').version;

var fearCoreTasks = chalk.cyan('Installing FEAR Core app ' + version + ':');

copyDefaultToAppRoot('jspm.conf.js', 'app/scripts/jspm.conf.js');

var execSync = require('child_process').execSync;

execSync('cd ' + appRoot.path + '; npm install digitalinnovation/fear-core-tasks#' + version + ' --save-dev; npm install digitalinnovation/fear-core-serve#' + version + ' --save;', {
    stdio: 'inherit'
});

function copyDefaultToAppRoot (srcFilename, dstFilename) {

    var src = moduleRoot + '/defaults/' + srcFilename;
    var dst = appRoot + '/' + dstFilename;

    try {

        // clobber: false means fs-extra will throw an error if the dst exists
        fs.copySync(src, dst, { clobber: false });

        logCopyOk(dstFilename);

    } catch (err) {

        if (err.message === 'EEXIST') {
            logFileSkipped(dstFilename);
        } else {
            logCopyError(dstFilename, err);
        }

    }
}

function logCopyOk (filename) {
    console.log(fearCoreTasks+' copied default '+chalk.green(filename)+' to project root\n');
}

function logFileSkipped (filename) {
    console.log(fearCoreTasks+' skipped copying default '+chalk.green(filename)+'\nFile already exists in project root\n');
}

function logCopyError (filename, err) {
    console.log(fearCoreTasks+chalk.red(' cannot copy '+filename)+'\nError: '+err.message+'\n');
}
