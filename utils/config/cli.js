'use strict';
var argv = require('yargs').argv;
var chalk = require('chalk');

function getTimestamp(){
    var date = new Date();
    var HH = date.getHours();
    var MM = date.getMinutes();
    var ss = date.getSeconds();
    return '[' + chalk.grey(HH + ':' + MM + ':' + ss) + ']';
}

module.exports = {

    debugLog: function(section, color) {
        color = color || 'green';
        var cli = this;

        if(!chalk[color] || typeof chalk[color] !== 'function') {
            throw new Error('Color: ' + color + 'is not available');
        }

        return function logger(msg) {
            var stamp;
            if(cli.env.NODE_DEBUG && cli.env.NODE_DEBUG.indexOf(section) > -1) {
                stamp = getTimestamp() + ' ';
                process.stdout.write(stamp + chalk[color](msg) + '\n');
            }
        };
    },

    get argv() {
        return argv;
    },

    get env() {
        return process.env;
    }

};