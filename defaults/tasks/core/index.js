'use strict';

module.exports = function () {

    var gulp = require('gulp');
    var config = require('fear-core').utils.config();

    /**
     * install-dependencies
     * install front end jspm dependencies
     */
    gulp.task('install-dependencies', function () {
        var execSync = require('child_process').execSync;

        execSync('jspm install', {
            stdio: 'inherit'
        });
    });

    /**
     * create-app-config
     */
    gulp.task('create-app-config', function () {

        var gulp = require('gulp');
        var gutil = require('gulp-util');
        var Readable = require('stream').Readable,
            src = new Readable({
                objectMode: true
            }),
            content = config.getAppConfigTpl().replace('__JSON_CONFIG__', JSON.stringify(config.get('app')));

        // create source file content
        src._read = function () {
            this.push(new gutil.File({
                cwd: '',
                base: '',
                path: 'config.js',
                contents: new Buffer(content)
            }));
            this.push(null);
        };

        // move file to destination
        return src.pipe(gulp.dest(config.get('paths.common.scripts', {base : config.get('paths.app.base')})));
    });
};