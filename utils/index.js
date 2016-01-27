'use strict';

/**
 * @module utils
 */
module.exports = {

    /**
     * get config settings
     * @see module:utils/config
     */
    config: require('./config'),

    /**
     * file system utils
     * @see module:utils/fs
     */
    fs: require('./fs'),

    /**
     * notify user with messages to console
     * @see module:utils/notify
     */
    notify: require('./notify'),

    /**
     * install npm dependencies
     * @see module:utils/install
     */
    install: require('./install')
};
