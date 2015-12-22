/* eslint no-console: 0 */

'use strict';

var appRoot = require('app-root-path');

console.log(appRoot)

var moduleRoot = process.cwd();

var fs = require('fs-extra');
var chalk = require('chalk');
var path = require('path');

var fearCoreTasks = chalk.cyan('Installing FEAR:');

var fearDeps = require('../../package.json').fear;

/**
 * load paths
 */
var paths = require('./defaults/config/default/paths');

/**
 * create folder structure
 * -app
 * -config
 * -tasks
 * -test
 */
function createDirectory (dir) {

    var fs = require('fs-extra');

    if (!fs.existsSync(dir)) {
        fs.mkdirs(dir);
    }
}

createDirectory(path.join(appRoot, paths.app.base));
createDirectory(path.join(appRoot, 'test'));

fs.copySync('./defaults/config', path.join(appRoot, 'config'), {clobber : false});
fs.copySync('./defaults/tasks', path.join(appRoot, 'tasks'), {clobber : false});

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
        fs.writeFileSync(dst, toCompile({ appVersion: fearDeps.jspm.app }));

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
    devDependencies: [],
    dependencies : []
};

var d;

for (d in fearDeps.dependencies) {
    if (fearDeps.dependencies.hasOwnProperty(d)) {
        opts.dependencies.push("digitalinnovation/fear-core-" + d + "#" + fearDeps.dependencies[d]);
    }
}

if (!process.env.NODE_ENV) {
    for (d in fearDeps.devDependencies) {
        if (fearDeps.devDependencies.hasOwnProperty(d)) {
            opts.devDependencies.push("digitalinnovation/fear-core-" + d + "#" + fearDeps.devDependencies[d]);
        }
    }
}

installModules(opts, function () {});
