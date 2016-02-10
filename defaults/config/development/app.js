'use strict';

exports.config = {
    defaultPage: 'hub',
    pages: {
        'application': require('./pages/application')(),
        'documentation': require('./pages/core')()
    }
};

