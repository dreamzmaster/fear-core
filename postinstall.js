'use strict';

var fs = require('fs');
var appRoot = require('app-root-path');
var args = require('yargs');
var packagePath = '../../package.json';

fs.exists(packagePath, function (parentAppExists) {

    if (parentAppExists) {

        var moduleRoot = process.cwd();
        var path = require('path');
        var utils = require('./utils');
        var fearDeps = require(packagePath).fear;

        /**
         * workout which modules can be installed
         * based on command line flags. this will also
         * be used to dynamically create the gulpfile.
         */
        var fearAvailableModules = {};

        for (var d in fearDeps.dependencies) {
            fearAvailableModules[d] = {
                'install' : process.env.npm_config_fear === d || !process.env.npm_config_fear,
                'tasks': fearDeps.dependencies[d].tasks
            }
        }

        /**
         * load paths configuration
         */
        var paths = require('./defaults/config/default/paths');

        utils.fs.copy('./defaults/config', path.join(appRoot.path, 'config'), false);
        utils.fs.copy('./defaults/tasks', path.join(appRoot.path, 'tasks'), false);
        utils.fs.copy('./defaults/tasks/core', path.join(appRoot.path, 'tasks/core'), true);
        utils.fs.copy('./defaults/mock', path.join(appRoot.path, 'mock'), false);

        /**
         * Write versioned files to project root
         */
        var templateData = {appVersion: fearDeps.jspm.app};

        Promise.all([
            utils.fs.write(
                utils.fs.template(moduleRoot + '/defaults/jspm.conf.js', templateData),
                path.join(appRoot.path, paths.app.base + '/common/scripts/jspm.conf.js')
            ),
            utils.fs.write(
                utils.fs.template(moduleRoot + '/defaults/jspm.conf.test.js', templateData),
                path.join(appRoot.path, 'test/jspm.conf.js')
            ),
            utils.fs.write(
                utils.fs.template(moduleRoot + '/defaults/jspm.conf.prod.js', templateData),
                path.join(appRoot.path, 'config/integrated/jspm.conf.js')
            ),
            utils.fs.write(
                utils.fs.template(moduleRoot + '/defaults/gulpfile.tpl', {
                    'modules' : fearAvailableModules,
                    'each' : require('lodash/collection/each')
                }),
                path.join(appRoot.path, 'gulpfile.js')
            )
        ]).then(function () {

            /**
             * Install Fear core versioned modules
             */
            var dependencies = [];
            var d;

            for (d in fearDeps.dependencies) {
                if (fearDeps.dependencies.hasOwnProperty(d) && fearAvailableModules[d].install) {
                    dependencies.push(
                        'fear-core-' + d + (fearDeps.dependencies[d].version !== 'latest'
                                ? '@' + fearDeps.dependencies[d].version
                                : ''
                        )
                    );
                }
            }

            utils.install.npm(dependencies);
        });
    }
});
