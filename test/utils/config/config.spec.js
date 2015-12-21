'use strict';

var expect = require('chai').expect;

var Config = require('../../../utils/config').Config;
var mocks = require('./config-mocks');

describe('config object', function() {
    var config, config2, mockLoader, mockCli, argv;
    var env = { integrated: 'integrated', development: 'development', production: 'production' };
    var data= { default: { } };

    function resetEnvironment() {
        delete mockCli.env.NODE_ENV;
    }

    beforeEach(function() {
        mockCli = mocks.cliFactory();
        mockLoader = mocks.loaderFactory(data);
        resetEnvironment();
        argv = mockCli.argv;
        config = new Config(mockLoader, mockCli);
    });

    it('should be composable', function() {
        expect(config).to.be.an.instanceOf(Config),
        expect(config).to.exist;
    });

    it('should expose an api', function() {
        expect(config.get).to.exist;
        expect(config.path).to.exist;
        expect(config.env).to.exist;
    });

    it('should be possible to change the root directory via options', function () {
        var data = { 'default' : { 'paths' : { 'css' : 'value' } } };
        var root = 'config/other';

        var config = new Config(mocks.loaderFactory(data, root), mockCli, { root: root });
        var path = config.get('paths.css');
        expect(path).to.equal('value');
    });

    it('should be possible to change the matching pattern via options', function() {
        var data = {
            'default' : {
                'paths': {
                    'js' : '<%=base%>/some/pointer',
                    'css': '${base}/some/pointer'
                }
            }
        };
        var matchingAlgorithm = /<%=([\s\S]+?)%>/g;
        var matchingAlgorithm2 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var mockLoader2 = mocks.loaderFactory(data);

        //Test with algorithm for old lodash
        var config = new Config(mockLoader2, mockCli, { delimeters: matchingAlgorithm });
        var js = config.get('paths.js', { base : 'to' });
        expect(js).to.equal('to/some/pointer');

        //test with algorithm for es6
        var config2 = new Config(mockLoader2, mockCli, { delimeters: matchingAlgorithm2 });
        var css = config2.get('paths.css', { base : 'from' });
        expect(css).to.equal('from/some/pointer');
    });

    it('should throw an error when the default config file isn\'t present', function() {
        function configFactory() {
            return new Config(mocks.loaderFactory(), mockCli);
        }

        expect(configFactory).to.throw('Default config file or default folder is not present!');
    });

    it('should throw an error when the properties parameter is not a string', function() {
        function errorFactory(key) {
            return function () {
                config.get(key);
            };
        }

        expect(errorFactory(1)).to.throw('Properties parameter should be a string.');
        expect(errorFactory({})).to.throw('Properties parameter should be a string.');
        expect(errorFactory([])).to.throw('Properties parameter should be a string.');
        expect(errorFactory(null)).to.throw('Properties parameter should be a string.');
        expect(errorFactory(undefined)).to.throw('Properties parameter should be a string.');
    });

    it('should default fallback to development environment', function() {
        expect(config.env()).to.equal(env.development);
    });

    it('should be possible to change the environment via arguments and environment variable', function() {
        mockCli.env.NODE_ENV = env.development;
        config2 = new Config(mockLoader, mockCli);
        expect(config2.env()).to.equal(env.development);

        mockCli.env.NODE_ENV = env.integrated;
        config2 = new Config(mockLoader, mockCli);
        expect(config2.env()).to.equal(env.integrated);

        argv.env = env.development;
        config2 = new Config(mockLoader, mockCli);
        expect(config2.env()).to.equal(env.development);

        argv.env = env.integrated;
        config2 = new Config(mockLoader, mockCli);
        expect(config2.env()).to.equal(env.integrated);
    });

    it('should use commandline arguments before environment variables', function() {
        argv.env = env.production;
        mockCli.env.NODE_ENV = env.integrated;
        config2 = new Config(mockLoader, mockCli);
        expect(config2.env()).to.equal(env.production);
    });

    it('should resolve the config path for a specific type', function() {
        expect(config.path('webserver')).to.equal('config/development/webserver.js');
        expect(config.path('karma')).to.equal('config/development/karma.js');

        mockCli.env.NODE_ENV = env.integrated;
        config2 = new Config(mockLoader, mockCli);

        expect(config2.path('webserver')).to.equal('config/integrated/webserver.js');
        expect(config2.path('karma')).to.equal('config/integrated/karma.js');
    });

});
