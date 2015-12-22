'use strict';

module.exports = {
    gulp: {
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
        base: 'app/jspm_components/github/DigitalInnovation/fear-core-app@<%= appVersion %>',
        sass: 'app/jspm_components/github/DigitalInnovation/fear-core-app@<%= appVersion %>/sass',
        scripts: 'app/jspm_components/github/DigitalInnovation/fear-core-app@<%= appVersion %>/scripts',
        views: 'app/jspm_components/github/DigitalInnovation/fear-core-app@<%= appVersion %>/views',
        packages: '{{base}}/github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/packages'
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
        fear: {
            base: '{{base}}/fear',
            images: '{{base}}/fear/assets/images',
            font: '{{base}}/fear/assets/fonts',
            css: '{{base}}/fear/css',
            sass: '{{base}}/fear/sass',
            scripts: '{{base}}/fear/scripts',
            views: '{{base}}/fear/views'
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
