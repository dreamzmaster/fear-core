'use strict';

require('../base.js');
var ui = require('fear-core').ui;

module.exports = function () {

    var spawn = require('child_process').spawn,
        tasks = require('fear-core').build,
        config = require('fear-core').utils.config(),
        gulp = require('gulp'),
        gutil = require('gulp-util');

    /**
     * build-setup
     * remove folders generated from previous build
     */
    gulp.task('build-setup', tasks.fs.remove([
        config.get('paths.temp.base'),
        config.get('paths.prod.base'),
        'app/common/assets/images/generated'
    ]));


    /**
     * build-pre-copy
     * move static assets to .tmp folder
     */
    gulp.task('build-pre-copy', tasks.fs.copy([
        config.get('paths.app.base') + '/**/*.{ico,png,svg,txt,tmp,jpg}',
        config.get('paths.app.base') + '/**/views/**/*.html',
        config.get('paths.app.base') + '/**/scripts/**/*.js',
        config.get('paths.app.base') + '/**/components/**/*.*',
        config.get('paths.app.base') + '/jspm_components/**/*.*'
    ], config.get('paths.temp.base'), 1));


    /**
     * build-post-copy
     * move generated assets to .tmp folder
     */
    gulp.task('build-post-copy', ['build-post-copy-core-ui'], tasks.fs.copy([
        config.get('paths.app.base') + '/assets/**/*.*'
    ], config.get('paths.temp.base'), 1));

    gulp.task('build-post-copy-core-ui', function() {
        return gulp.src([ui.assetPaths + '/**/*.*'])
            .pipe(gulp.dest(config.get('paths.temp.base') + '/common/assets'));
    });


    /**
     * build-move
     * move built files from .tmp to prod directory
     */
    gulp.task('build-move', tasks.fs.copy([
        config.get('paths.temp.base') + '/**/*.*'
    ], config.get('paths.prod.base'), 1));


    /**
     * build-log-revision
     * add git commit SHA to txt file
     */
    gulp.task('build-log-revision', function (cb) {
        if (process.platform === 'win32') {
            gutil.log(gutil.colors.red('Not writing a release.txt file due to this running on windows'));
            cb();
        } else {
            spawn('bash', ['-c', 'mkdir -p prod; (echo shop-UX; git rev-parse HEAD) > prod/release.txt'], {
                stdio: 'inherit'
            }).on('close', cb);
        }
    });
};
