'use strict';

/**
 * @module utils
 */
module.exports = {

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

module.exports.utils.install.setAppDependencies(
    module.exports.utils.application.getApplicationDependencies().dependencies
);
