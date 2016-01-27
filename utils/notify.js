'use strict';

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
        process.stdout.write(message);
    }
};