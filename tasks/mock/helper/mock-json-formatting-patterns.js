'use strict';

var patterns = {
    lineEndings: new RegExp('(\\n|\\r)', 'g'),
    doubleQuote: new RegExp(/("|\\")/g)
};

module.exports = patterns;
