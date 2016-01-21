'use strict';

var config = require('fear-core').utils.config();
var path = require('path');

/**
 * toProcessHelper
 * @type {{getPaths: Function, getAssetPath: Function, shouldAddProduct: Function}}
 */
var toProcessHelper = {

    /**
     * getPaths
     * @param product
     * @param source eg .tmp
     * @param destination eg .tmp
     * @param globPrefix
     * @returns {{sources: Array, destinations: Array}}
     */
    getPaths : function (product, source, destination, globPrefix) {

        var toProcess = {
            sources : [],
            destinations : []
        };

        globPrefix = globPrefix || '';

        for (var p in config.get('paths.teams')) {
            if (config.get('paths.teams').hasOwnProperty(p) && toProcessHelper.shouldAddProduct(product, p)) {

                if (source) {
                    toProcess.sources.push(
                        path.join(toProcessHelper.getAssetPath(p, source.type, source.base), globPrefix, config.get('paths.glob.' + source.type))
                    );
                }

                if (destination) {
                    toProcess.destinations.push(
                        path.join(toProcessHelper.getAssetPath(p, destination.type, destination.base), globPrefix)
                    );
                }
            }
        }

        return toProcess;
    },

    /**
     * getAssetPath
     * @param product
     * @param type
     * @param folder
     * @returns {string}
     */
    getAssetPath : function (product, type, folder) {
        return config.get('paths.teams.' + product + '.' + type, {base : folder});
    },

    /**
     * shouldAddProduct
     * @param product
     * @param configProduct
     * @returns {boolean}
     */
    shouldAddProduct : function (product, configProduct) {
        return product === 'all' || product === configProduct;
    }
};

module.exports = toProcessHelper;