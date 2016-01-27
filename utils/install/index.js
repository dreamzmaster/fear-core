'use strict';

var exec       = require('child_process').exec;
var concurrent = require('./concurrent');

function install (dependencies) {

    process.stdout.write('\nInstalling FEAR Dependencies:\n');

    function installDependencies (cmd, packages) {
        concurrent(packages, function (val) {
            exec(cmd + val, function () {
                process.stdout.write('module: ', val);
            });
        }, function (error) {
            if (error) {
                process.stdout.write(error);
            }
        });
    }

    installDependencies('npm install ', dependencies, 'devDependencies');
}

module.exports = install;