'use strict';

/**
 * @module tasks/mock/copy
 */

/**
 * taskFactory
 * @param files {Array}
 * glob
 * @param destination {Array}
 * glob
 * @returns task {Function}
 */
module.exports = function taskFactory (files, destination) {

    return function task () {

        var gulp = require('gulp');
        var flatten = require('gulp-flatten');

        return gulp.src(files)
            .pipe(flatten())
            .pipe(gulp.dest(destination));
    };
};
