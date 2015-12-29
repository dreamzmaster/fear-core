'use strict';

module.exports = {
    create : function createDirectory (dir) {

        var fs = require('fs-extra');

        var fullPath = path.join(appRoot.path, dir);

        if (!fs.existsSync(fullPath)) {
            fs.mkdirs(fullPath);
        }
    }
}