'use strict';

var expect = require('chai').expect;

describe.only('file system template utility', function () {

    var utils;

    beforeEach(function () {
        utils = require('../../../utils/fs');
        utils.messages = function () {};
    });

    it('should template contents of a file and return string', function() {
        expect(utils.template('test/utils/fs/template.json', {'path1' : 'banana', 'path2' : 'apple', 'path3' : 'orange'})).to.equal('{\n  "scripts": "banana/apple/orange"\n}');
    });

    it('should throw error if template data property doesnt exist', function() {
        expect(function () {
            utils.template('test/utils/fs/template.json', {'path1' : 'banana'});
        }).to.throw(Error);
    });

    it('should throw errors if arguments not supplied', function() {
        expect(function () {
            utils.template();
        }).to.throw('no source argument');

        expect(function () {
            utils.template({'path1' : 'banana'});
        }).to.throw('no source argument');

        expect(function () {
            utils.template('test/utils/fs/template.json');
        }).to.throw('no template vars supplied');
    });
});
