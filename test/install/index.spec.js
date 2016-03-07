'use strict';

var chai = require('chai');
var expect = chai.expect;

describe('application install utilities', function () {

    var utils;
    var modules;

    beforeEach(function () {
        utils = require('../../utils/install');

        modules = {
            'build': {
                'version': '1.0.0',
                'tasks': true
            },
            'dev': {
                'version': '1.0.0',
                'tasks': true
            },
            'aut': {
                'version': '1.0.0',
                'tasks': true
            }
        };
    });

    describe('decorateInstallationConfig', function () {

        it('should return object of modules to install', function () {

            utils.setAppDependencies(modules);

            expect(utils.decorateInstallationConfig('build,dev')).to.deep.equal({
                'aut': {
                    'version': '1.0.0',
                    'install': false,
                    'tasks': true
                },
                'build': {
                    'version': '1.0.0',
                    'install': true,
                    'tasks': true
                },
                'dev': {
                    'version': '1.0.0',
                    'install': true,
                    'tasks': true
                }
            });

            expect(utils.decorateInstallationConfig('build')).to.deep.equal({
                'aut': {
                    'version': '1.0.0',
                    'install': false,
                    'tasks': true
                },
                'build': {
                    'version': '1.0.0',
                    'install': true,
                    'tasks': true
                },
                'dev': {
                    'version': '1.0.0',
                    'install': false,
                    'tasks': true
                }
            });

            expect(utils.decorateInstallationConfig(null)).to.deep.equal({
                'aut': {
                    'version': '1.0.0',
                    'install': false,
                    'tasks': true
                },
                'build': {
                    'version': '1.0.0',
                    'install': false,
                    'tasks': true
                },
                'dev': {
                    'version': '1.0.0',
                    'install': false,
                    'tasks': true
                }
            });
        });


        it('should return empty object if fear dependencies is empty object', function () {
            utils.setAppDependencies({});
            expect(utils.decorateInstallationConfig(null)).to.deep.equal({});
        });


        it('should return false if no dependencies specified', function () {
            utils.setAppDependencies(null);
            expect(utils.decorateInstallationConfig(null)).to.equal(false);
        });
    });

    describe('isNewerVersion', function () {
        it('should return true if version is higher than installed version', function () {
            expect(utils.isNewerVersion('1.0.0', '1.0.1')).to.equal(false);
            expect(utils.isNewerVersion('1.0.0', '1.0.0')).to.equal(false);
            expect(utils.isNewerVersion('1.1.0', false)).to.equal(false);
            expect(utils.isNewerVersion('1.1.0', '1.0.0')).to.equal(true);
        });
    });

    describe('getInstallConfig', function () {
        it('should return true if version is higher than installed version', function () {
            utils.setAppDependencies(modules);
            expect(utils.getInstallConfig(utils.getAppDependencies(), function () { return true; })).to.deep.equal([
                'fear-core-build@1.0.0',
                'fear-core-dev@1.0.0',
                'fear-core-aut@1.0.0'
            ]);

            expect(utils.getInstallConfig(utils.getAppDependencies(), function () { return false; })).to.deep.equal([]);
        });
    });
});
