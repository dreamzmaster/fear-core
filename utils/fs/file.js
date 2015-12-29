'use strict';

var fs = require('fs-extra');

module.exports = {
    copy : function (source, destination, replace) {

        try {

            // clobber: false means fs-extra will throw an error if the dst exists
            fs.copySync(source, destination, {clobber : replace});

            logCopyOk(dstFilename);

        } catch (err) {

            if (err.message === 'EEXIST') {
                logFileSkipped(dstFilename);
            } else {
                logCopyError(dstFilename, err);
            }

        }
    },
    template : function (source, templateVars) {

        var template = require('lodash/string/template');

        var templateContent = fs.readFileSync(source).toString();
        var toCompile = template(templateContent);

        return toCompile(templateVars)
    }
};