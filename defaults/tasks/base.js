'use strict';

/*jshint -W020 */
global.argv = require('yargs').argv;
global.pkg = require('../package.json');
global.channel = global.argv.channel ? global.argv.channel : 'default';
global.product = global.argv.product ? global.argv.product : 'all';
global.page = global.argv.page ?  global.argv.page : 'hub';
global.size = global.argv.size ?  global.argv.size : 'xsmall';
