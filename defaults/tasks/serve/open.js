'use strict';

var config = require('fear-core').utils.config();

module.exports = function () {

    var serve = require('fear-core').serve;
    var gulp = require('gulp');
    var webserver = config.get('webserver');
    var options;

    function getChannelQueryString() {
        if (global.channel !== 'default') {
            return 'channel=' + global.channel;
        }
    }

    options = {
        protocol : 'http://',
        host : webserver.host,
        port : webserver.port,
        page : global.page,
        queryString : getChannelQueryString()
    };

    return gulp.task('open-page', serve.openUrl(options));
};
