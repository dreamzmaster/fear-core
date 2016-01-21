'use strict';

module.exports = function () {

    var gulp = require('gulp');
    var tasks = require('fear-core').tasks;
    var config = require('fear-core').utils.config();

    var appConfig = config.get('app');
    var template = config.getAppConfigTpl();

    return gulp.task('create-app-config', tasks.createAppConfig(appConfig, template, config.get('paths.common.scripts', {base : config.get('paths.app.base')})));

};
