'use strict';

module.exports = {
    gulp: {
        tasks: 'core/tasks',
        specs: 'test/tasks'
    },
    app: {
        base: 'app',
        sass: 'app/**/sass',
        scripts: 'app/**/scripts',
        views: 'app/**/views'
    },
    prod: {
        base: 'prod'
    },
    temp: {
        base: '.tmp'
    },
    core: {
        base: 'app/jspm_components/github/DigitalInnovation/fear-core-app@1.0.0',
        css: 'core/css',
        sass: 'app/jspm_components/github/DigitalInnovation/fear-core-app@1.0.0/sass',
        scripts: 'app/jspm_components/github/DigitalInnovation/fear-core-app@1.0.0/scripts',
        views: 'app/jspm_components/github/DigitalInnovation/fear-core-app@1.0.0/views',
        packages: '{{base}}/github:DigitalInnovation/fear-core-app@1.0.0/scripts/packages'
    },
    common: {
        base: '{{base}}/common',
        images: '{{base}}/common/assets/images',
        font: '{{base}}/common/assets/fonts',
        css: '{{base}}/common/css',
        sass: '{{base}}/common/sass',
        scripts: '{{base}}/common/scripts',
        views: '{{base}}/common/views'
    },
    teams: {
        bandc: {
            base: '{{base}}/bandc',
            images: '{{base}}/bandc/assets/images',
            font: '{{base}}/bandc/assets/fonts',
            css: '{{base}}/bandc/css',
            sass: '{{base}}/bandc/sass',
            scripts: '{{base}}/bandc/scripts',
            views: '{{base}}/bandc/views'
        },
        browse: {
            base: '{{base}}/browse',
            images: '{{base}}/browse/assets/images',
            font: '{{base}}/browse/assets/fonts',
            css: '{{base}}/browse/css',
            sass: '{{base}}/browse/sass',
            scripts: '{{base}}/browse/scripts',
            views: '{{base}}/browse/views'
        }
    },
    glob: {
        css : '**/*.css',
        sass : '**/*.scss',
        views : '**/*.html',
        scripts : '**/*.js',
        packages : 'packages/**/*.js',
        images : '**/*.{png,jpg}'
    }
};
