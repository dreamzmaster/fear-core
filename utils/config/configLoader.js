'use strict';
var each = require('lodash/collection/each');
var fs = require('fs');
var path = require('path');

module.exports = {

    load: function(filePath, root) {
        root = root || '';
        filePath = path.join(root, filePath);
        var module = void 0;
        try {
            module = require(filePath);
        }finally {
            return module;
        }
    },

    loadDir: function(dirPath, root) {
        root = root || '';
        var dir = path.join(root, dirPath);
        var runtime = this;
        var map = {};
        var files;
        var stat;

        try {
            stat = fs.statSync(dir);
        }catch(ex) {
            return void 0;
        }

        if(stat.isDirectory()) {
            files = fs.readdirSync(dir);
            each(files, function(file) {
                var filePath = path.join(dir, file);
                var parsed = path.parse(filePath);
                map[parsed.name] = runtime.load(filePath) || {};
            });
            return map;
        } else {
            return void 0;
        }
    }

};