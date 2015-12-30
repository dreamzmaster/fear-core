'use strict';

var fs = require('fs-extra');
var messages = require('./messages');

module.exports = {
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
    template : function (source, templateVars) {

        var template = require('lodash/string/template');

        var templateContent = fs.readFileSync(source).toString();
        var toCompile = template(templateContent);

        return toCompile(templateVars)
    }
};