System.config({
    baseURL: "/base/app/scripts",
    defaultJSExtensions: true,
    transpiler: "babel",
    babelOptions: {
        "optional": [
            "runtime",
            "optimisation.modules.system"
        ]
    },
    paths: {
        "test*": "/base/test*",
        "node_modules*": "/base/node_modules*",
        "github:*": "/base/app/jspm_components/github/*",
        "scripts/lib/*": "fear-core-app/scripts/lib/*",
        "npm:*": "/base/app/jspm_components/npm/*",
        "views/*": "/base/app/views/*"
    },
    shim: {
        'chai' : {'exports' : 'chai'},
        'sinon' : {'exports' : 'sinon'},
        'sinon-chai' : {'exports' : 'sinon-chai'},
        "angular": {
            "exports": "angular"
        },
        "angular-route": [
            "angular"
        ],
        "angular-ipcookie": [
            "angular"
        ],
        "angular-sanitize": [
            "angular"
        ],
        "angular-resource": [
            "angular"
        ],
        "angular-animate": [
            "angular"
        ],
        "angular-mocks": [
            "angular"
        ],
        "angular-moment": [
            "angular"
        ],
        "angular-ui-router": [
            "angular"
        ],
        "lib/jquery.signalr": {
            deps: ['lib/jquery']
        }
    },

    meta: {
        "lib/jquery": {
            "format": "global"
        }
    },

    "dependencies": {
        "angular": "github:angular/bower-angular@1.2.28",
        "angular-animate": "github:angular/bower-angular-animate@1.2.28",
        "angular-ipcookie": "github:ivpusic/angular-cookie@4.0.9",
        "angular-load": "github:urish/angular-load@0.3.0",
        "angular-mocks": "github:angular/bower-angular-mocks@1.2.28",
        "angular-moment": "github:urish/angular-moment@0.10.2",
        "angular-resource": "github:angular/bower-angular-resource@1.2.28",
        "angular-route": "github:angular/bower-angular-route@1.2.28",
        "angular-sanitize": "github:angular/bower-angular-sanitize@1.2.28",
        "angular-ui-router": "github:DigitalInnovation/ui-router@^0.2.15",
        "fastclick": "github:ftlabs/fastclick@1.0.3",
        "moment": "github:moment/moment@2.10.6",
        "underscore": "github:jashkenas/underscore@1.8.2",
        "usertiming": "github:nicjansma/usertiming.js@0.1.6"
    },

    map: {
        'chai': 'node_modules/chai/chai',
        'sinon': 'node_modules/sinon/pkg/sinon',
        'sinon-chai': 'node_modules/sinon-chai/lib/sinon-chai',
        "angular": "github:angular/bower-angular@1.2.28",
        "angular-animate": "github:angular/bower-angular-animate@1.2.28",
        "angular-ipcookie": "github:ivpusic/angular-cookie@4.0.9",
        "angular-load": "github:urish/angular-load@0.3.0",
        "angular-mocks": "github:angular/bower-angular-mocks@1.2.28",
        "angular-moment": "github:urish/angular-moment@0.10.2",
        "angular-resource": "github:angular/bower-angular-resource@1.2.28",
        "angular-route": "github:angular/bower-angular-route@1.2.28",
        "angular-sanitize": "github:angular/bower-angular-sanitize@1.2.28",
        "angular-ui-router": "github:DigitalInnovation/ui-router@0.2.15",
        "app": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/app",
        "babel": "npm:babel-core@5.8.25",
        "babel-runtime": "npm:babel-runtime@5.8.24",
        "core-js": "npm:core-js@1.1.4",
        "fastclick": "github:ftlabs/fastclick@1.0.3",
        "lib/domQ": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/domQ",
        "lib/hd": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/hd",
        "lib/utils": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/utils",
        "moment": "github:moment/moment@2.10.6",
        "packages/angular.package": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/packages/angular.package",
        "lib/jquery": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/jquery",
        'lib/jquery.signalr': 'github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/jquery.signalr-1.1.2',
        "signalr.hubs": "test/stubs/signalHubs",
        "text": "github:systemjs/plugin-text@0.0.3",
        "traceur": "github:jmcriffey/bower-traceur@0.0.91",
        "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.91",
        "underscore": "github:jashkenas/underscore@1.8.2",
        "usertiming": "github:nicjansma/usertiming.js@0.1.6",
        "fearServiceAPI": "test/stubs/fearAPIStub",
        "github:angular/bower-angular-mocks@1.2.28": {
            "angular": "github:angular/bower-angular@1.2.28"
        },
        "github:jspm/nodelibs-process@0.1.1": {
            "process": "npm:process@0.10.1"
        },
        "npm:babel-runtime@5.8.24": {
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:core-js@1.1.4": {
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        }
    }
});