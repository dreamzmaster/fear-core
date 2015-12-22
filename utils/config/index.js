'use strict';

var path = require('path');
var loader  = require('./configLoader');
var cli     = require('./cli');

var merge = require('lodash/object/merge');
var defaults = require('lodash/object/defaults');
var template = require('lodash/string/template');
var every = require('lodash/collection/every');
var each = require('lodash/collection/each');

var isObject = require('lodash/lang/isobject');
var isNull = require('lodash/lang/isNull');
var isUndefined = require('lodash/lang/isUndefined');

/*eslint-disable */
/**
 * @name Config
 * @constructor
 * @description
 * A utility which helps you managing to manage and organize your configuration for different environment nicely spread out over multiple files.
 *
 * The configuration can be broken down as follows: 
 * (By default the config utility looks for a config folder at the root of your project)
 *
 * ```
 * config/
 * ├── default.js
 * ├── default
 * │   ├── app.js
 * │   ├── breakpoint.js
 * │   ├── credentials.js
 * │   ├── fear.js
 * │   ├── karma.js
 * │   ├── mustache.js
 * │   ├── packages.js
 * │   ├── paths.js
 * │   ├── protractor.js
 * │   └── webdriverio.js
 * ├── development
 * │   ├── app.js
 * │   ├── karma.js
 * │   ├── protractor.js
 * │   ├── webdriverio.js
 * │   └── webserver.js
 * └── integrated
 *     ├── app.js
 *     ├── karma.js
 *     ├── protractor.js
 *     ├── webdriverio.js
 *     └── webserver.js
 * ```
 * # Introduction
 * In the default.js file you can require your default configuration values which resides in the default fodler. If no default.js file is present, the config utility will try to load
 * all the default properties from the files in the folder. Using the filename as key on the object.
 * 
 * Default the config utility will fallback to the devlopment environment, but this can be overriden be providing --env args to a commandline utility or by 
 * setting the NODE_ENV variable to a different environment.
 * 
 * ## Getting a value
 * A configuration value can be requested by providing the correct key to the get function:
 * 
 * ```js
 * var karma = config.get('karma');
 * ```
 *
 * The above function will return the full configuration object provided by the default/karma.js file overriden by (development/integrated)/karma.js.
 *
 * It's also possible to get a specific config value from the karma file.
 * If the karma.js file contains the following code:
 *
 * ```js
 * module.exports = {
 *  server : '127.0.0.1'
 * }
 * ```
 *
 * Calling the get function with the following keys will return the coresponding value in the karma.js file:
 * 
 * ```js
 * var server = config.get('karma.server');
 * ```
 *
 * ## Templating the return value
 * It's possible to template a key using the handlebars syntax.
 * 
 * If for example a certain path.js config file would look as follows:
 *
 * ```js
 * module.exports = {
 *  css: '{{base}}/css',
 *  js: '{{base}}/javascript'     
 * }
 * ```
 *
 * Using the get syntax with a certain context object will return the templated string
 *
 * ```js
 * var css = config.get('paths.css',{ base: 'app' }); // returns: 'app/css'
 * var paths = config.get('paths') // returns: { css: 'app/css', js: 'app/javascript' } 
 * ```
 *
 * ## Changing the target
 * It is also possible to provide a target string as second or third parameter. This will switch the target folder where configuration files get loaded from:
 * 
 * Given the following config folder structure:
 * 
 * ```
 * ├── buser
 * ├── default
 * │   └── config.js
 * │   ├── cardTypes.js
 * │   ├── checkoutHeader.js
 * │   ├── config.js
 * │   ├── content.js
 * │   ├── countries.js
 * │   ├── espots.js
 * │   ├── featureSwitch.js
 * │   ├── globalHeader.js
 * │   ├── instructions.js
 * │   ├── labels.js
 * │   ├── miscellaneous.js
 * │   ├── pageContent.js
 * │   ├── userLogon.js
 * │   └── userRegistration.js
 * ├── defaults.js
 * ├── mobileapp
 * │   └── config.js
 * └── tsop
 *     ├── checkoutHeader.js
 *     ├── config.js
 *     └── labels.js
 * ```
 * You can provide a different target via:
 * 
 * ```
 * var mobile = config.get('config', 'mobile') //returns: config object in mobile folder
 * var tsop = config.get('config', { base : 'tmp' }, 'tsop) //returns: config object in mobile folder while templating the result
 * ```
 * 
 * ## Options
 * The config utility can be configured using a configurations object. The default values are as follows:
 * 
 * ```json
 * {
 *  "root": "config", //Root folder where the utility will look for configuration files
 *  "delimeters": /{{([\s\S]+?)}}/g, //Regex used as matching algorith for templating values
 *  "target": "development", //The default target folder
 *  "debug": false //Determines if the utility logs verbose information 
 * }
 * ```
 * 
 * These defaults can be cahnged as follows:
 * 
 * ```js
 * var config = require('fear-core').config({
 *  root: 'mocks/channel', //changes the root folder
 *  delimeters: /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g // Changes templating algorithm to '${value}'
 * })
 * ```
 * 
 * ## Debugging
 * It is possible to let the config utility log debug statements by setting the NODE_DEBUG environment variable to config. 
 * 
 * ```
 * NODE_DEBUG=config gulp ...
 * ```
 * 
 * Or by setting debug to true in the options object.
 * 
 * ```js
 * var config = require('fear-core').config({ debug: true });
 * ```
 * 
 * @param  {object} fsLoader
 * @param  {object} cli
 * @param  {object} options
 * @param  {string} options.root The root config folder, defaults to config
 * @param  {regex} options.delimeters Regex used for the templating algorithm, defaults to handlebars matching
 *
 * @throws Will throw an error when there is no default.js or default folder in the root folder
 */
/*eslint-enable */
function Config(fs, cli, opt) {
    var options = {
        root: 'config',
        delimeters: /{{([\s\S]+?)}}/g,
        target: 'development',
        debug: false
    };

    if(this.debug) {
        cli.env.NODE_DEBUG = 'config';
    }

    // Debug logging function for the config object. Only logs when NODE_DEBUG contains config
    this._debug = cli.debugLog('config');
    this._debug('Starting config object creation.');

    // Make sure that options are overridable use local options variable as default
    this._options = defaults(opt || {}, options);
    this._fs = fs;



    // Set the current environment taking in to account the given arguments and current node environment
    // always fall back to 'development'
    this._env = cli.argv.env || cli.env.NODE_ENV || options.target;
    this._target = this._env;

    this._debug('Using the following root: ' + this._options.root);
    this._debug('Current target set to: ' + this._target);

    // Load default configuration either via a default.js file in the root folder
    // Otherwise fallback to loading all the files in the default folder and generate an object from there

    this._defaultMap = fs.load(path.join(this._options.root, 'default'), process.cwd());

    if(this._defaultMap) {
        this._debug('Default configuration loaded from default.js file.');
    }else {
        this._defaultMap = fs.loadDir(path.join(this._options.root, 'default'), process.cwd());
        this._debug('Default configuration constructed from files in the default folder');
    }

    if(this._defaultMap == null || this._defaultMap === undefined) {
        this._debug('No default.js or default folder found');
        throw new Error('Default config file or default folder is not present!');
    }

    this._devMap = fs.load(path.join(this._options.root, this.env(), 'development')) || {};
}

Config.prototype = {

    /**
     * @name config.get
     * @public
     * @description
     * Returns the configuration value for the requested key, the return value can be templated given a certain context object.
     *
     * @param  {string} properties String of a key value in the configuration, nested configuration can be reached by providing the keys seperated by dots.
     * @param  {object|string} [context]
     * @param  {string} [target]
     *
     * @throws When no parameters are provided
     * @throws When properties parameter is not a string
     *
     * @returns {string|object} Config value of the requested property
     */
    get: function (properties, context, target) {
        var result = this._configMap,
            rootKey = '',
            config = this,
            temp,
            configHash;

        if(arguments.length === 0) {
            throw new Error('No arguments provided');
        }

        if(typeof properties !== 'string') {
            throw new Error('Properties parameter should be a string.');
        }

        //When context is a string swap it with the target
        if(typeof context === 'string') {
            target = context;
        }

        target = target || this._target;
        this._debug('Current target is set to:' + target);

        // Splits the given property in a list of properties and walks down the config map
        // and returns the requested value from the map
        every(properties.split('.'), function(key, index, props) {
            if(!rootKey) {
                rootKey = key;
            }

            // If the current key is the root key then load in the config object by constructing a filepath,
            // the filepath gets constructed based on the current target and the rootkey
            if(rootKey === key) {
                var filePath = path.join(config._options.root, target, rootKey);
                config._debug('Loading following file: ' + filePath);
                configHash = config._fs.load(filePath, process.cwd());
                result = merge(
                    {},
                    config._defaultMap[rootKey],
                    configHash || {},
                    config._devMap[rootKey]
                );
            // If the current key is not the root key, reassign result to keep traversing the tree
            }else {
                result = result[key];
            }

            //Stop loop when there are no more keys or next result returns undefined
            if(isNull(result) || isUndefined(result)) {
                return false;
            }else {
                return (typeof result === 'object') || !!props[index +1] || result[props[index + 1]];
            }
        });

        if(context) {
            if(typeof result === 'string') {
                result = template(result, { interpolate: config._options.delimeters })(context);
            } else if(isObject(result)){
                temp = {};
                each(Object.keys(result), function(key) {
                    var keyValue = result[key];

                    if(typeof keyValue === 'string') {
                        temp[key] = template(keyValue, { interpolate: config._options.delimeters })(context);
                    }else {
                        temp[key] = keyValue;
                    }
                });
                result = temp;
            }
        }

        return result;
    },

    /**
     * @param  {string} Type
     * @returns {string} Filepath to the requested config file
     */
    path: function (type) {
        return path.join(this._options.root, this.env(), type + '.js');
    },

    /**
     * @returns {string} Representing the current environment, taking in to account the node environment, cli arguments, defaults to development
     */
    env: function () {
        return this._env;
    },

    getAppConfigTpl: function () {
        return '/*jshint quotmark:true */ \"use strict\"; define(function () { return __JSON_CONFIG__; });';
    }

};

getConfig.Config = Config;
function getConfig(defaults) {
    return new Config(loader, cli, defaults);
}

module.exports = getConfig;
