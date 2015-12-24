'use strict';

var cli = require('../../../utils/config/cli');

function mockCliFactory() {
    return {
        argv : {},
        env: { NODE_ENV: undefined },
        debugLog: cli.debugLog
    };
}

function mockLoaderFactory(data, root) {
    root = root || 'config';
    var mock = {};
    var current = mock;

    root.split('/').forEach(function(path, index, pieces) {
        var count = index + 1;
        if(count >=  pieces.length) {
            current[path] = data;
        }else {
            current[path] = {};
        }

        current = current[path];
    });

    return {
        load: function (filePath) {
            var value = mock;
            filePath.split('/').every(function(key) {
                value = value[key];
                return value ? true : false;
            });
            return value;
        },
        loadDir: function() { }
    };
}

module.exports = {
    cliFactory: mockCliFactory,
    loaderFactory: mockLoaderFactory
};
