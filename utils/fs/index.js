'use strict';

var fs = require('fs-extra');

/**
 * @module utils/fs
 */
module.exports = {

    /**
     * user messages
     * @see module:utils/fs/messages
     */
    messages: require('./messages'),

    /**
     * copy
     * copy file or folder to given destination. if replace true then replace existing file
     * @param source {String}
     * @param destination {String}
     * @param replace {Boolean}
     * @returns {void}
     */
    copy : function (source, destination, replace) {

        try {
            // clobber: false means fs-extra will throw an error if the dst exists
            fs.copySync(source, destination, {clobber : replace});
            this.messages.copyOk(destination);
        } catch (err) {
            if (err.message === 'EEXIST') {
                this.messages.fileSkipped(destination);
            } else {
                this.messages.copyError(destination, err);
            }
        }
    },

    /**
     * write
     * write string to file at given destination. if replace true then replace existing file
     * @param content {String}
     * @param destination {String}
     * @param replace {Boolean}
     * @returns {Object}
     */
    write : function (content, destination, replace) {

        var _self = this;

        function _write (content, destination) {
            try {
                fs.writeFileSync(destination, content);
                _self.messages.copyOk(destination);
            } catch (err) {
                if (err.message === 'EEXIST') {
                    _self.messages.fileSkipped(destination);
                } else {
                    _self.messages.copyError(destination, err);
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
     * folder utilities
     */
    folder : {

        /**
         * empty folder
         * @param folder
         */
        empty : function (folder) {
            return fs.emptyDirSync(folder);
        },

        /**
         * create folder (and structure if doesn't exist)
         * @param folderPath
         */
        create : function (folderPath) {
            return fs.ensureDirSync(folderPath);
        }
    },

    /**
     * template
     * read souce file and template in values from templateVars object. templateVars = {key:value} will replace
     * <%= key %> with value in template.
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
    }
};
