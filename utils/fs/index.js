'use strict';

var fs = require('fs-extra');
var utils;

/**
 * @module utils/fs
 */
module.exports = utils = {

    /**
     * copy
     * @param source {String}
     * @param destination {Object}
     * @param replace {Boolean}
     * @returns {void}
     */
    copy : function (source, destination, replace) {

        try {
            // clobber: false means fs-extra will throw an error if the dst exists
            fs.copySync(source, destination, {clobber : replace});
            utils.messages.copyOk(destination);
        } catch (err) {
            if (err.message === 'EEXIST') {
                utils.messages.fileSkipped(destination);
            } else {
                utils.messages.copyError(destination, err);
            }
        }
    },

    /**
     * write
     * @param content {String}
     * @param destination {String}
     * @param replace {Boolean}
     * @returns {Object}
     */
    write : function (content, destination, replace) {

        function _write (content, destination) {
            try {
                fs.writeFileSync(destination, content);
                utils.messages.copyOk(destination);
            } catch (err) {
                if (err.message === 'EEXIST') {
                    utils.messages.fileSkipped(destination);
                } else {
                    utils.messages.copyError(destination, err);
                }
            }
        }

        return new Promise(function(resolve) {

            if (replace) {
                fs.ensureFile(destination, function () {
                    _write(content, destination);
                    resolve();
                });
            } else {
                _write(content, destination);
                resolve();
            }
        });
    },

    /**
     * template
     * @param source {String}
     * @param templateVars {Object}
     * @returns {String}
     */
    template : function (source, templateVars) {

        if (typeof source !== 'string') {
            throw new Error('no source argument');
        }

        if (typeof templateVars !== 'object') {
            throw new Error('no template vars supplied');
        }

        var template = require('lodash/string/template');

        var templateContent = fs.readFileSync(source).toString();
        var toCompile = template(templateContent);

        return toCompile(templateVars);
    },

    /**
     * user messages
     * @see module:utils/fs/messages
     */
    messages: require('./messages')
};
