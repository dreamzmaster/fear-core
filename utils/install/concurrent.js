'use strict';

function asyncEachArray (arr, iterator, done) {

    if (!arr || !arr.length) {
        return done();
    }

    var idx = -1;
    var len;
    var lastIdx;

    lastIdx = len = arr.length;

    while (++idx < lastIdx) {
        iterator(arr[idx], idx, next);
    }

    function next () {
        if (--len === 0) {
            return done(null);
        }
    }
}

function asyncEach (obj, iterator, done) {
    if (Array.isArray(obj)) {
        asyncEachArray(obj, iterator, done);
        return;
    }

    asyncEachArray(obj && Object.keys(obj), function (key, index, done) {
        iterator(obj[key], key, done);
    }, done);
}

module.exports = asyncEach;