'use strict';

var fs = require('fs');
var appRoot = require('app-root-path');
var utils = require('./utils');

utils.install.setAppDependencies(utils.application.getApplicationDependencies().dependencies);

fs.exists(utils.application.packagePath, function (parentModuleExists) {

    var moduleRoot = process.cwd();
    var path = require('path');

    var fearAvailableModules = utils.install.getModuleInstallationConfig(process.env.npm_config_fear);

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

        var templateData = {appVersion: utils.application.getApplicationDependencies().jspm.app};

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
                utils.install.createGulpFile(fearAvailableModules)
            ]).then(function () {
                utils.install.installFearDependencies(fearAvailableModules);
            });

        });
    }
});