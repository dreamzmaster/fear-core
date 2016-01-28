'use strict';

module.exports = function taskFactory(taskName, taskDependencies, mockDataParentPath) {

    return {
        tasks: function() {
            var gulp = require('gulp');
            var core = require('fear-core');
            var serve = core.serve;
            var config = core.utils.config();
            var mustacheConfig = config.get('mustache');
            var connectServer;
            var processMockDataParentPath = '';
            var baseFolder = global.argv.folder || 'app';

            var defaultTaskDependencies = [
                'clean-mocks',
                'copy-api-mocks',
                'copy-data-mocks',
                'copy-error-mocks',
                'copy-analytics-mocks'
            ];

            //first path must be the base folder
            var staticPaths = [
                config.get('paths.' + baseFolder + '.base'),
                config.get('paths.temp.base'),
                config.get('paths.core.base'),
                'docs'
            ];

            if (mockDataParentPath ) {
                processMockDataParentPath = '/' + mockDataParentPath;
                mustacheConfig.dataDir = mockDataParentPath + '/' + mustacheConfig.dataDir;
            }

            var channelDefaults = require(process.cwd() + processMockDataParentPath + '/mock/src/channel');

            taskName = taskName ? taskName + '-' : '';

            function isDev() {
                return config.env() === 'development';
            }

            function isTestsRunning() {
                return global.testsRunning;
            }

            function liveReloadConditions() {
                return isDev() && !isTestsRunning();
            }

            gulp.task('start-' + taskName + 'server', taskDependencies || defaultTaskDependencies, function() {

                var customMiddleware = [
                    require(process.cwd() + processMockDataParentPath + '/mock/api.js'),
                    require(process.cwd() + processMockDataParentPath + '/mock/support/redirects')
                ];

                connectServer = serve.startServer(
                    config.get('webserver.host'),
                    config.get('webserver.port'),
                    staticPaths,
                    liveReloadConditions,
                    mustacheConfig,
                    channelDefaults,
                    customMiddleware
                );

                return connectServer;
            });

            gulp.task('stop-' + taskName + 'server', function() {
                connectServer.serverClose();
            });
        }
    };
};