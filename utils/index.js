'use strict';

module.exports = function () {

    /**
     * @see module:utils/config
     */
    config: require('./config'),

    /**
     * @see module:utils/fs
     */
    fs: require('./fs'),

    /**
     * @see module:utils/notify
     */
    notify: require('./notify'),

    /**
     * @see module:utils/install
     */
    install: require('./install'),

    /**
     * @see module:utils/application
     */
    application: require('./application')
};
