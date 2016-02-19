'use strict';

var chai = require('chai');
var expect = chai.expect;

describe('application install utilities', function () {

    var utils = require('../../utils/install');

    utils.setAppDependencies({
        'build': {
            'version': 'DigitalInnovation/fear-core-build#develop',
            'tasks': true
        },
        'dev': {
            'version': 'DigitalInnovation/fear-core-dev#develop',
            'tasks': true
        },
        'aut': {
            'version': 'DigitalInnovation/fear-core-aut#develop',
            'tasks': true
        }
    });

    it('should return object of modules to install', function() {

        expect(utils.getModuleInstallationConfig('build,dev')).to.deep.equal({
            'aut' : {
                'install' : false,
                'tasks': true
            },
            'build' : {
                'install' : true,
                'tasks': true
            },
            'dev' : {
                'install' : true,
                'tasks': true
            }
        });

        expect(utils.getModuleInstallationConfig('build')).to.deep.equal({
            'aut' : {
                'install' : false,
                'tasks': true
            },
            'build' : {
                'install' : true,
                'tasks': true
            },
            'dev' : {
                'install' : false,
                'tasks': true
            }
        });

        expect(utils.getModuleInstallationConfig(null)).to.deep.equal({
            'aut' : {
                'install' : true,
                'tasks': true
            },
            'build' : {
                'install' : true,
                'tasks': true
            },
            'dev' : {
                'install' : true,
                'tasks': true
            }
        });
    });

    it('should return empty object if fear dependencies is empty object', function() {
        utils.appDependencies = {};
        expect(utils.getModuleInstallationConfig(null)).to.deep.equal({});
    });

    it('should return false if no dependencies specified', function() {
        utils.appDependencies = null;
        expect(utils.getModuleInstallationConfig(null)).to.equal(false);
    });
});
