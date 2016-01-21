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

//utils.fs.file.copy('./defaults/config', path.join(appRoot.path, 'config'), false);
//utils.fs.file.copy('./defaults/tasks', path.join(appRoot.path, 'tasks'), false);
//utils.fs.file.copy('./defaults/mock', path.join(appRoot.path, 'mock'), false);
//utils.fs.file.copy('./defaults/gulpfile.js', path.join(appRoot.path, 'gulpfile.js'), false);

/**
 * Write versioned files to project root
 */
var templateData = { appVersion: fearDeps.jspm.app };

Promise.all([
    utils.fs.file.write(
        utils.fs.file.template(moduleRoot + '/defaults/jspm.conf.js', templateData),
        path.join(appRoot.path, paths.app.base + '/common/scripts/jspm.conf.js')
    ),
    utils.fs.file.write(
        utils.fs.file.template(moduleRoot + '/defaults/jspm.conf.test.js', templateData),
        path.join(appRoot.path, 'test/jspm.conf.js')
    ),
    utils.fs.file.write(
        utils.fs.file.template(moduleRoot + '/defaults/jspm.conf.prod.js', templateData),
        path.join(appRoot.path, 'config/integrated/jspm.conf.js')
    )
]).then(function () {

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
            opts.dependencies.push('fear-core-' + d + (fearDeps.dependencies[d] !== 'latest' ? '@' + fearDeps.dependencies[d] : ''));
        }
    }

    if (!process.env.NODE_ENV) {
        for (d in fearDeps.devDependencies) {
            if (fearDeps.devDependencies.hasOwnProperty(d)) {
                opts.devDependencies.push('fear-core-' + d + (fearDeps.devDependencies[d] !== 'latest' ? '@' + fearDeps.devDependencies[d] : ''));
            }
        }
    }

    installModules(opts, function () {});
});

