'use strict';

var appRoot = require('app-root-path');

/**
 * @module application
 */
module.exports = {

    applicationDependencies : appRoot.path + '/package.json',

    /**
     * getApplicationDependencies
     * @returns {Object}
     */
    getApplicationDependencies : function () {
        return this.applicationDependencies;
    },

    /**
     * getInstalledModulesArray
     * @returns {Array}
     */
    getInstalledModules : function () {

        var fs = require('fs');

        var files = fs.readdirSync('./node_modules');

        var installedModules = [];

        for (var f in files) {
            if (files.hasOwnProperty(f)) {
                if (files[f].match(new RegExp('fear-core-.*'))) {

                    var parts = files[f].split('-');

                    if (this.getApplicationDependencies().dependencies[parts[parts.length -1]]) {
                        installedModules.push(parts[parts.length -1]);
                    }
                }
            }
        }

        return installedModules;
    }
};
