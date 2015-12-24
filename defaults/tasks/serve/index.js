'use strict';

var config = require('fear-core').config();

module.exports = function () {

    var gulp = require('gulp');
    var gutil = require('gulp-util');

    require('./open')();
    require('./serve')();

    gulp.task('serve', function () {

        var runSequence = require('run-sequence');

        if (global.argv.help) {
            gutil.log(gutil.colors.white(
                '\n\nServe a development web page\n\n' +
                '--page [path] e.g checkout/orderReview\n' +
                'without the page option the default (hub) page will be served and all js bundles created\n\n' +
                '--channel [channel] e.g tsop or buser\n' +
                '--light without css/js compilation\n'
            ));

            return;
        }

        function serveDev() {
            return runSequence('start-server', 'open-page');
        }

        serveDev();
    });
};
