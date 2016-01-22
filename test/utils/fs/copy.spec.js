'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('file system copy utility', function () {

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

    it('should copy files', function() {
        utils.copy('test/utils/fs/template.json', 'test/utils/fs/.tmp/template.json');
        expect(fs.existsSync('test/utils/fs/.tmp//template.json')).to.be.true;
        expect(utils.messages.copyOk).to.have.been.called;
    });

    it('should not copy file if file exists and not asked to replace (false)', function() {
        utils.copy('test/utils/fs/template.json', 'test/utils/fs/.tmp/template.json', false);
        expect(fs.existsSync('test/utils/fs/.tmp//template.json')).to.be.true;
        expect(utils.messages.fileSkipped).to.have.been.called;
    });

    it('should copy file if file exists and asked to replace (true)', function() {
        utils.copy('test/utils/fs/template.json', 'test/utils/fs/.tmp/template.json', true);
        expect(fs.existsSync('test/utils/fs/.tmp//template.json')).to.be.true;
        expect(utils.messages.copyOk).to.have.been.called;
    });

    it('should report copy error if source doesn\'t exist', function() {
        utils.copy('test/utils/fs/noExist.json', 'test/utils/fs/.tmp/template.json', true);
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
