'use strict';

var exec       = require('child_process').exec;
var concurrent = require('./concurrent');
var path = require('path');
var fs = require('../fs');
var moduleRoot = process.cwd();

/**
 * @module utils/install
 */
module.exports = {

    /**
     * user messages
     * @see module:utils/install/messages
     */
    messages: require('./messages'),

    /**
     * Install Fear core versioned modules
     * @param fearDeps
     * @param toInstall
     * @returns {boolean}
     */
    installFearDependencies : function (fearDeps, toInstall) {

        var dependencies = [];

        if (!toInstall) {
            return false;
        }

        for (var d in fearDeps.dependencies) {
            if (fearDeps.dependencies.hasOwnProperty(d) && toInstall[d].install) {
                dependencies.push(
                    'fear-core-' + d + (fearDeps.dependencies[d].version !== 'latest'
                            ? '@' + fearDeps.dependencies[d].version
                            : ''
                    )
                );
            }
        }

        this.npmInstall(dependencies);
    },

    /**
     * npm
     * @param dependencies {Array}
     */
    npmInstall : function (dependencies) {

        var _self = this;
        var installPath;

        _self.messages.start();

        //ensure we are in correct directory to install
        installPath = path.normalize(path.join(__dirname, '../../'));
        process.chdir(installPath);

        function installDependencies(cmd, packages) {
            concurrent(packages, function (module) {
                exec(cmd + module, function () {
                    _self.messages.module(module);
                });
            }, function (error) {
                if (error) {
                    _self.messages.error(error);
                }
            });
        }

        installDependencies('npm install ', dependencies);
    },

    /**
     * getAvailableFearModules
     * @description workout which modules can be installed  based on command line flags.
     * @param fearDeps {Object}
     * @param requestedModules {String}
     * @returns {Object|Boolean}
     */
    getAvailableFearModules : function (fearDeps, requestedModules) {

        var requestedModulesArray = [];
        var fearAvailableModules = {};

        if (!fearDeps) {
            return false;
        }

        if (requestedModules) {
            requestedModulesArray = requestedModules.split(',');
        }

        for (var d in fearDeps.dependencies) {
            if (fearDeps.dependencies.hasOwnProperty(d)) {
                fearAvailableModules[d] = {
                    'install' : requestedModulesArray.indexOf(d) > -1 || !requestedModules,
                    'tasks': fearDeps.dependencies[d].tasks
                };
            }
        }

        return fearAvailableModules;
    },

    /**
     * getInstalledModulesArray
     * @returns {Array}
     */
    getInstalledModules : function () {

        var files = fs.readdirSync('./node_modules/fear-core/node_modules/');

        var existingModules = [];

        for (var f in files) {
            if (files.hasOwnProperty(f)) {
                if (files[f].match(new RegExp('fear-core-.*'))) {
                    var parts = files[f].split('-');
                    if (fearDeps.dependencies[parts[parts.length -1]]) {
                        existingModules.push(parts[parts.length -1]);
                    }
                }
            }
        }

        return existingModules;
    },

    /**
     * createGulpFile
     * @param modules
     */
    createGulpFile : function (modules) {
        fs.write(
            fs.template(moduleRoot + '/defaults/gulpfile.tpl', {
                'modules' : modules,
                'each' : require('lodash/collection/each')
            }),
            path.join(appRoot.path, 'gulpfile.js')
        )
    }
};