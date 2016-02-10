'use strict';

module.exports = function () {

    var gulp = require('gulp');
    var tasks = require('fear-core').tasks;
    var config = require('fear-core').utils.config();

    var ui = require('fear-core').ui;
    var path = require('path');

    var autoPrefixOptions = {
        browsers: ['last 20 version', 'Explorer >= 8', 'Android >= 2'],
        cascade: false
    };

    gulp.task(
        'compile-core-sass',
        tasks.sass.compile(
            path.join(config.get('paths.core.sass'), config.get('paths.glob.sass')),
            autoPrefixOptions,
            config.get('paths.core.css', {base : config.get('paths.app.base')}),
            ui.sassPaths
        )
    );

    return gulp.task('compile-sass', ['compile-core-sass'], function () {
        return gulp.src(path.join(config.get('paths.app.css'), config.get('paths.glob.css')))
            .pipe(gulp.dest(config.get('paths.temp.base')));
    });
};