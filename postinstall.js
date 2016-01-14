'use strict';

var appRoot = require('app-root-path');
var moduleRoot = process.cwd();
var fs = require('fs-extra');
var path = require('path');
var utils = require('./utils');
var fearDeps = require('../../package.json').fear;

/**
 * load paths
 */
var paths = require('./defaults/config/default/paths');

utils.fs.directory.create(paths.app.base);
utils.fs.directory.create('test');

utils.fs.file.copy('./defaults/app', path.join(appRoot.path, paths.app.base), false);
utils.fs.file.copy('./defaults/config', path.join(appRoot.path, 'config'), false);
utils.fs.file.copy('./defaults/tasks', path.join(appRoot.path, 'tasks'), false);

/**
 * Copy versioned files to project root
 */
var template = require('lodash/string/template');

copyDefaultToAppRoot('jspm.conf.js', paths.app.base + '/common/scripts/jspm.conf.js');
copyDefaultToAppRoot('jspm.conf.test.js', 'test/jspm.conf.test.js');

copyDefaultToAppRoot('gulpfile.js', 'gulpfile.js');

function copyDefaultToAppRoot (srcFilename, dstFilename) {

    var src = moduleRoot + '/defaults/' + srcFilename;
    var dst = appRoot + '/' + dstFilename;

    try {
        fs.writeFileSync(dst, utils.fs.file.template(src, { appVersion: fearDeps.jspm.app }));

        utils.fs.messages.copyOk(dstFilename);

    } catch (err) {

        if (err.message === 'EEXIST') {
            utils.fs.messages.fileSkipped(dstFilename);
        } else {
            utils.fs.messages.copyError(dstFilename, err);
        }

    }
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

