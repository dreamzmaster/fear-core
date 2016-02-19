'use strict';

var appRoot = require('app-root-path');
var path = require('path');

/**
 * @module utils/application
 */
module.exports = {

    packagePath: path.join(appRoot.path, 'package.json'),

    /**
     * getApplicationDependencies
     * @returns {Object}
     */
    getApplicationDependencies: function () {
        return require(this.packagePath).fear;
    },

    /**
     * isFileNameCoreModule
     * @param fileName
     * @returns {*}
     */
    isFileNameCoreModule: function (fileName) {
        return fileName.match(new RegExp('fear-core-.*'));
    },

    /**
     * getInstalledModulesArray
     * @description Inspects the fear-core node_modules folder and returns an array of module names that are installed and
     * also exist in the fear section of the applications package.json
     * @returns {Array} e.g ['build', 'dev']
     */
    getInstalledModules: function () {

        var fs = require('fs');
        var files = fs.readdirSync('./node_modules');
        var installedModules = [];

        for (var f in files) {
            if (files.hasOwnProperty(f) && this.isFileNameCoreModule(files[f])) {

                var parts = files[f].split('-');

                if (this.getApplicationDependencies().dependencies[parts[parts.length - 1]]) {
                    installedModules.push(parts[parts.length - 1]);
                }
            }
        }

        return installedModules;
    }
};
