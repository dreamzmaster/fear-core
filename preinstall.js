'use strict';

/**
 * load paths
 */
var paths = require('./defaults/config/paths');
console.log('paths', paths);

/**
 * create folder structure
 * -app
 * -config
 * -tasks
 * -test
 */
function createDirectory (dir) {

    var fs = require('fs-extra');

    if (!fs.existsSync(dir)) {
        fs.mkdirs(dir);
    }
}

createDirectory(paths.app.base);
createDirectory('test');

fs.copySync('./config', 'config', {clobber : false});
fs.copySync('./tasks', 'tasks', {clobber : false});