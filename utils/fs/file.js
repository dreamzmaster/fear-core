'use strict';

var fs = require('fs-extra');
var messages = require('./messages');

/**
 * @module utils/fs/file
 */
module.exports = {

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
            messages.copyOk(destination);
        } catch (err) {
            if (err.message === 'EEXIST') {
                messages.fileSkipped(destination);
            } else {
                messages.copyError(destination, err);
            }
        }
    },

    /**
     * write
     * @param content
     * @param destination
     * @returns {Object}
     */
    write : function (content, destination) {

        return new Promise(function(resolve) {

            fs.ensureFile(destination, function () {

                try {
                    fs.writeFileSync(destination, content);
                    messages.copyOk(destination);
                } catch (err) {
                    if (err.message === 'EEXIST') {
                        messages.fileSkipped(destination);
                    } else {
                        messages.copyError(destination, err);
                    }
                }

                resolve();
            });
        });
    },

    /**
     * template
     * @param source {String}
     * @param templateVars {Object}
     * @returns {String}
     */
    template : function (source, templateVars) {

        var template = require('lodash/string/template');

        var templateContent = fs.readFileSync(source).toString();
        var toCompile = template(templateContent);

        return toCompile(templateVars);
    }
};
