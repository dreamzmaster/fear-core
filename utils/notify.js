'use strict';

var gutil = require('gulp-util');

/**
 * @module utils/notify
 */
module.exports = {

    /**
     * log
     * @param message {String}
     * @returns {void}
     */
    log : function (message) {
        gutil.log(message);
    }
};