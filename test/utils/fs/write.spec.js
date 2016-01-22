'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe.only('file system copy utility', function () {

    var utils;
    var tempDir = 'test/utils/fs/.tmp';
    var fs = require('fs-extra');

    before(function () {
        createStubs();
        fs.mkdir(tempDir);
    });

    after(function () {
        fs.removeSync(tempDir);
    });

    it('should write file', function() {
        utils.write('content', 'test/utils/fs/.tmp/test.txt');
        expect(fs.existsSync('test/utils/fs/.tmp/test.txt')).to.be.true;
        expect(utils.messages.copyOk).to.have.been.called;
    });

    it('should write file if already exists and replace is true', function() {
        utils.write('content', 'test/utils/fs/.tmp/test.txt', true).then(function () {
            expect(fs.existsSync('test/utils/fs/.tmp/test.txt')).to.be.true;
            expect(utils.messages.copyOk).to.have.been.called;
        });
    });

    it('should not write file if already exists and replace is false', function() {
        utils.write('content', 'test/utils/fs/.tmp/test.txt', false).then(function () {
            expect(fs.existsSync('test/utils/fs/.tmp/test.txt')).to.be.true;
            expect(utils.messages.fileSkipped).to.have.been.called;
        });
    });

    it('should report copy error content argument is not a string', function() {
        utils.copy(1, 'test/utils/fs/.tmp/template.json', true);
        expect(utils.messages.copyError).to.have.been.called;
    });

    function createStubs () {
        utils = require('../../../utils/fs');
        utils.messages = function () {};
        utils.messages.copyOk = sinon.spy();
        utils.messages.fileSkipped = sinon.spy();
        utils.messages.copyError = sinon.spy();
    }
});
