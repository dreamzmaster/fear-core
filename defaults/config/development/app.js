'use strict';

exports.config = {
    defaultPage: 'hub',
    pages: {
        'applications': [
            {
                'name': 'Product group',
                'links': []
            }
        ],
        'documentation': [
            { 'name': 'Core', 'url': 'http://digitalinnovation.github.io/fear-core' },
            { 'name': 'Core Tasks', 'url': 'http://digitalinnovation.github.io/fear-core-tasks' },
            { 'name': 'Core UI', 'url': 'http://digitalinnovation.github.io/fear-core-ui' },
            { 'name': 'Core Serve', 'url': 'http://digitalinnovation.github.io/fear-core-serve' },
            { 'name': 'Pattern Library', 'url': 'http://patternlibrary.auto.devops.mnscorp.net' },
            { 'name': 'SDK', 'url': 'https://confluence.devops.mnscorp.net/display/FEAR/FEAR+SDK' }
        ]
    }
};
