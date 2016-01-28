'use strict';

var core = require('fear-core');
var config = core.utils.config();

module.exports = function () {

    var gulp = require('gulp'),
        gutil = require('gulp-util'),
        express = require('express'),
        loyaltyService = require(process.cwd() + '/mock/loyalty-service/index');

    require('./open')();
    require('./serveFactory')().tasks();

    function isDev() {
        return config.env() === 'development';
    }

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
            return runSequence(
                'create-app-config',
                'serve-loyalty-service-stub',
                'start-server',
                'open-page',
                'watch'
            );
        }

        function serveBuild() {
            return runSequence(
                'create-app-config',
                'serve-loyalty-service-stub',
                'start-server'
            );
        }

        if (isDev()) {
            serveDev();
        } else {
            serveBuild();
        }
    });

    gulp.task('serve-loyalty-service-stub', function () {
        express().use('/loyalty-service', loyaltyService.app).listen(9001);
    });
};