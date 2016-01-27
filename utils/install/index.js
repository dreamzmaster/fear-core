'use strict';

var exec       = require('child_process').exec;
var concurrent = require('./concurrent');
var gutil = require('gulp-util');

function install (dependencies) {

    gutil.log('\nInstalling FEAR Dependencies:\n');

    function installDependencies (cmd, packages) {
        concurrent(packages, function (val) {
            exec(cmd + val, function () {
                gutil.log('module: ', val);
            });
        }, function (error) {
            if (error) {
                gutil.log(error);
            }
        });
    }

    installDependencies('npm install ', dependencies, 'devDependencies');
}

module.exports = install;