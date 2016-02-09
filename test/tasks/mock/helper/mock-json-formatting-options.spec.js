'use strict';

var patterns = require(process.cwd() + '/tasks/mock/helper/mock-json-formatting-patterns');
var expect = require('chai').expect;

describe('gulp tasks helper', function () {

    describe('mock json formatting', function () {

        function exercisePatternOn(data, pattern, replacement) {
            return data.replace(pattern, replacement);
        }

        describe('line endings pattern', function () {

            var expectedOutput = '{"foo":{"bar":true}}';

            it('should find all Windows (\\r\\n) line endings', function () {
                var data = '{\r\n"foo":\r\n{"bar":true\r\n}\r\n}';
                var result = exercisePatternOn(data, patterns.lineEndings, '');
                expect(result).to.equal(expectedOutput);
            });

            it('should find all Unix (\\n) line endings', function () {
                var data = '{\n"foo":\n{"bar":true\n}\n}';
                var result = exercisePatternOn(data, patterns.lineEndings, '');
                expect(result).to.equal(expectedOutput);
            });

            it('should find all carriage return (\\r) line endings', function () {
                var data = '{\r"foo":\r{"bar":true\r}\r}';
                var result = exercisePatternOn(data, patterns.lineEndings, '');
                expect(result).to.equal(expectedOutput);
            });

        });

        describe('double quotes pattern', function () {

            it('should find all double quotes', function () {
                var data = '{"foo":{"bar":true}}';
                var result = exercisePatternOn(data, patterns.doubleQuote, '\\"');
                expect(result).to.equal('{\\"foo\\":{\\"bar\\":true}}');
            });

        });

    });

});
