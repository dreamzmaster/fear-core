/* eslint no-console: 0 */

'use strict';

var appRoot = require('app-root-path');

var moduleRoot = process.cwd();

var fs = require('fs');
var chalk = require('chalk');

var fearCoreTasks = chalk.cyan('Installing FEAR:');

var fearDependencies = require('../../package.json').fearDependencies;

/**
 * Copy versioned files to project root
 */
var template = require('lodash/string/template');

copyDefaultToAppRoot('jspm.conf.js', 'app/common/scripts/jspm.conf.js');
copyDefaultToAppRoot('jspm.conf.test.js', 'test/jspm.conf.test.js');

function copyDefaultToAppRoot (srcFilename, dstFilename) {

    var src = moduleRoot + '/defaults/' + srcFilename;
    var dst = appRoot + '/' + dstFilename;

    try {
        var templateContent = fs.readFileSync(src).toString();
        var toCompile = template(templateContent);
        fs.writeFileSync(dst, toCompile({ appVersion: fearDependencies.app }));

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
    console.log(fearCoreTasks + ' copied default ' + chalk.green(filename) + ' to project\n');
}

function logFileSkipped (filename) {
    console.log(fearCoreTasks + ' skipped copying default ' + chalk.green(filename) + '\nFile already exists in project\n');
}

function logCopyError (filename, err) {
    console.log(fearCoreTasks + chalk.red(' cannot copy ' + filename) + '\nError: ' + err.message + '\n');
}

/**
 * Install Fear core versioned modules
 */
var installModules = require('npm-install-modules');

var opts = {
    devDependencies: [
        "digitalinnovation/fear-core-tasks#" + fearDependencies.tasks,
        "digitalinnovation/fear-core-ui#" + fearDependencies.ui
    ],
    dependencies : []
};

if (!process.env.NODE_ENV) {
    opts.dependencies.push("digitalinnovation/fear-core-serve#" + fearDependencies.serve);
}

installModules(opts, function () {});
