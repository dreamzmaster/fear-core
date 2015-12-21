'use strict';

var expect = require('chai').expect;

var Config = require('../../../utils/config').Config;
var mocks = require('./config-mocks');

var data = {
    default: {
        'webserver': { 'url' : 'http://localhost', 'port' : '3000' },
        'wdio': { 'output': '.tmp' },
        'karma': { 'root' : 'default', 'runOnce': true },
        'lint': { 'reporter' : 'simple' }
    },
    development: {
        'wdio': { 'output': '.dev' },
        'karma': { 'root' : 'dev' },
        'lint': { 'strict' : true },
        'paths': {
            'app' : { base : 'app' },
            'temp' : { base: '.tmp' },
            'team1' : { css : 'app/temp/css' },
            'team2' : {
                images: '{{folder}}/common/assets/images',
                font: '{{folder}}/common/assets/fonts',
                css: '{{folder}}/common/css',
                sass: '{{folder}}/common/sass',
                scripts: '{{folder}}/common/scripts',
                views: '{{folder}}/common/views'
            }
        },
        'development': {
            'karma': { 'root' : 'app' }
        }
    },
    integrated: {
        'wdio': { 'output': '.int' }
    }
};

describe('config object', function(){
    describe('get', function(){
        var config;
        var env = { integrated: 'integrated', development: 'development', production: 'production' };
        var mockLoader = mocks.loaderFactory(data);
        var mockCli = mocks.cliFactory();

        function configFactory() {
            return new Config(mockLoader, mockCli);
        }

        function setEnvionment(env) {
            if(env) {
                mockCli.env.NODE_ENV = env;
            } else {
                delete mockCli.env.NODE_ENV;
            }
        }

        beforeEach(function() {
            setEnvionment();
            config = configFactory();
        });

        it('should be defined', function() {
            expect(config.get).to.not.be.undefined;
        });

        it('should throw an error when no arguments are provided', function() {
            expect(function() {
                config.get();
            }).to.throw('No arguments provided');
        });

        it('should return the configuration object for the given key', function() {
            var webserver = config.get('webserver');
            expect(webserver).to.deep.equal(data.default.webserver);
        });

        it('should merge in config keys', function () {
            var lint = config.get('lint');
            expect(lint).to.deep.equal({
                'reporter' : 'simple',
                'strict' : true
            });
        });

        it('should correctly override the result for the given environment', function() {
            var result;

            //Result for environment: development
            result = config.get('wdio');
            expect(result).to.deep.equal(data.development.wdio);

            setEnvionment(env.integrated);
            config = configFactory();
            result = config.get('wdio');
            expect(result).to.deep.equal(data.integrated.wdio);
        });

        it('should override matching keys from the development file', function() {
            var karma = config.get('karma');
            expect(karma).to.deep.equal({
                'root' : 'app',
                'runOnce': true
            });
        });

        it('should be possible to provide a path of keys', function() {
            var team1 = config.get('paths.team1'),
                css = config.get('paths.team1.css');
            expect(team1).to.deep.equal(data.development.paths.team1);
            expect(css).to.equal(data.development.paths.team1.css);
        });

        it('should correctly template a requested key given a context object', function() {
            var css = config.get('paths.team2.css', { folder: '.tmp' });
            expect(css).to.equal('.tmp/common/css');
        });

        it('should correctly template all the keys in a config object given a certain context', function(){
            var team2 = config.get('paths.team2', { folder: '.tmp'});
            expect(team2).to.deep.equal({
                images: '.tmp/common/assets/images',
                font: '.tmp/common/assets/fonts',
                css: '.tmp/common/css',
                sass: '.tmp/common/sass',
                scripts: '.tmp/common/scripts',
                views: '.tmp/common/views'
            });
        });

        it('should be possible to override the target directory with a parameter', function () {
            var data = {
                'default': { 'mocks': { 'js': 'js/default' } },
                'tsop': { 'mocks': { 'js': 'js/tsop' } },
                'browse': { 'mocks': { 'js': 'js/browse' } }
            };

            var mockLoader2 = mocks.loaderFactory(data);
            var config = new Config(mockLoader2, mockCli);

            var tsop = config.get('mocks.js', 'tsop');
            var browse = config.get('mocks.js', 'browse');

            expect(tsop).to.equal('js/tsop');
            expect(browse).to.equal('js/browse');
        });

        it('should correctly fallback after changing the target', function() {
            var data = {
                'default': { 'mocks': { 'js': 'js/default' } },
                'tsop': { 'mocks': { 'js': 'js/tsop' } },
                'browse': { 'mocks': { 'js': 'js/browse' } }
            };

            var mockLoader2 = mocks.loaderFactory(data);
            var config = new Config(mockLoader2, mockCli);

            var browse = config.get('mocks', 'browse');
            var def = config.get('mocks');

            expect(browse).to.deep.equal(data.browse.mocks);
            expect(def).to.deep.equal(data.default.mocks);
        });

    });
});
