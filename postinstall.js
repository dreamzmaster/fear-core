'use strict';

var fs = require('fs');
var appRoot = require('app-root-path');
var packagePath = appRoot.path + '/package.json';

fs.exists(packagePath, function (parentModuleExists) {

    var moduleRoot = process.cwd();
    var path = require('path');
    var utils = require('./utils');
    var fearDeps = require(packagePath).fear;

    var fearAvailableModules = utils.install.getAvailableFearModules(fearDeps, process.env.npm_config_fear);

    /**
     * load paths configuration
     */
    var paths = require('./defaults/config/default/paths');

    /**
     * create parent app folder structure if doesn't exist
     * @returns {Promise}
     */
    function createApp() {

        return new Promise(function(resolve) {
            fs.exists(paths.app.base, function (parentAppCreated) {
                if (!parentAppCreated) {
                    utils.fs.copy('./defaults/config', path.join(appRoot.path, 'config'), false);
                    utils.fs.copy(
                        './defaults/config/development/pages/core.js',
                        path.join(appRoot.path, 'config/development/pages/core.js'
                    ), true);
                    utils.fs.copy('./defaults/tasks', path.join(appRoot.path, 'tasks'), false);
                    utils.fs.copy('./defaults/mock', path.join(appRoot.path, 'mock'), false);
                    utils.fs.copy('./defaults/preinstall.js', path.join(appRoot.path, 'preinstall.js'), true);

                    //temp untill scss used in hub is part of core-ui
                    utils.fs.folder.create(path.join(appRoot.path, paths.app.base, 'common/scripts'));

                    utils.fs.copy('./defaults/app/common', path.join(appRoot.path, 'app/common'), false);
                }

                resolve();
            });
        });
    }

    /**
     * Main installation procedure
     */
    if (parentModuleExists) {

        var templateData = {appVersion: fearDeps.jspm.app};

        createApp().then(function () {

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
                utils.install.installFearDependencies(fearDeps, fearAvailableModules);
            });

        });
    }
});