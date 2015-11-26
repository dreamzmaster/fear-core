/* eslint no-console: 0 */

'use strict';

var appRoot = require('app-root-path');
var template = require('lodash/string/template');

var moduleRoot = process.cwd();

var fs = require('fs');
var chalk = require('chalk');

var fearDependencies = require('../../package.json').fearDependencies;

var fearCoreTasks = chalk.cyan('Installing FEAR:');

copyDefaultToAppRoot('jspm.conf.js', 'app/scripts/jspm.conf.js');
copyDefaultToAppRoot('scripts.html', 'app/views/default/modules/scripts.html');

var execSync = require('child_process').execSync;

execSync('cd ' + appRoot.path);

var installModules = require('npm-install-modules');

var opts = {
    dependencies: ["digitalinnovation/fear-core-serve#" + fearDependencies.serve],
    devDependencies: ["digitalinnovation/fear-core-tasks#" + fearDependencies.tasks]
};

installModules(opts, function () {
    console.log('DONE');
});

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
    console.log(fearCoreTasks+' copied default '+chalk.green(filename)+' to project root\n');
}

function logFileSkipped (filename) {
    console.log(fearCoreTasks+' skipped copying default '+chalk.green(filename)+'\nFile already exists in project root\n');
}

function logCopyError (filename, err) {
    console.log(fearCoreTasks+chalk.red(' cannot copy '+filename)+'\nError: '+err.message+'\n');
}

//npm install digitalinnovation/fear-core-tasks#1.0.0 --save-dev; npm install digitalinnovation/fear-core-serve#1.0.0 --save;
