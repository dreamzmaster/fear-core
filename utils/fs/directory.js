'use strict';

var path = require('path');
var appRoot = require('app-root-path');
var fs = require('fs-extra');

/**
 * @module utils/fs/directory
 */
module.exports = {

    /**
     * create
     * @param dir {String}
     * @returns {void}
     */
    create : function createDirectory (dir) {

        var fullPath = path.join(appRoot.path, dir);

        if (!fs.existsSync(fullPath)) {
            fs.mkdirs(fullPath);
        }
    }
};