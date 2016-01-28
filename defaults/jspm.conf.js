/*eslint-disable */
System.config({
    baseURL: "/",
    defaultJSExtensions: true,
    transpiler: "traceur",
    paths: {
        "core/*": "jspm_components/github/DigitalInnovation/fear-core-app@1.0.1/*.js",
        "github:*": "jspm_components/github/*",
        "npm:*": "jspm_components/npm/*"
    },
    shim: {
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
        "bandc/scripts/lib/jquery.signalr": {
            "deps": [
                "bandc/scripts/lib/jquery"
            ]
        }
    },

    meta: {
        "bandc/scripts/lib/jquery": {
            "format": "global"
        }
    },

    map: {
        "angular": "github:angular/bower-angular@1.2.28",
        "angular-1.4.8": "github:angular/bower-angular@1.4.8",
        "angular-animate": "github:angular/bower-angular-animate@1.2.28",
        "angular-animate-1.4.8": "github:angular/bower-angular-animate@1.4.8",
        "angular-ipcookie": "github:ivpusic/angular-cookie@4.0.9",
        "angular-load": "github:urish/angular-load@0.3.0",
        "angular-mocks": "github:angular/bower-angular-mocks@1.2.28",
        "angular-mocks-1.4.8": "github:angular/bower-angular-mocks@1.4.8",
        "angular-moment": "github:urish/angular-moment@0.10.2",
        "angular-resource": "github:angular/bower-angular-resource@1.2.28",
        "angular-resource-1.4.8": "github:angular/bower-angular-resource@1.4.8",
        "angular-route": "github:angular/bower-angular-route@1.2.28",
        "angular-route-1.4.8": "github:angular/bower-angular-route@1.4.8",
        "angular-sanitize": "github:angular/bower-angular-sanitize@1.2.28",
        "angular-sanitize-1.4.8": "github:angular/bower-angular-sanitize@1.4.8",
        "angular-ui-router": "github:DigitalInnovation/ui-router@0.2.15",
        "babel": "npm:babel-core@5.8.33",
        "babel-runtime": "npm:babel-runtime@5.8.29",
        "core-js": "npm:core-js@1.2.5",
        "fastclick": "github:ftlabs/fastclick@1.0.3",
        "fear-core-app": "github:DigitalInnovation/fear-core-app@<%= appVersion %>",
        "moment": "github:moment/moment@2.10.6",
        "packages/angular.package": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/packages/angular-1.2.28.package",
        "packages/angular-1.4.8.package": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/packages/angular-1.4.8.package",
        "signalr.hubs": "http://localhost:9100/signalr/hubs?",
        "text": "github:systemjs/plugin-text@0.0.3",
        "traceur": "github:jmcriffey/bower-traceur@0.0.91",
        "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.91",
        "underscore": "github:jashkenas/underscore@1.8.2",
        "usertiming": "github:nicjansma/usertiming.js@0.1.6",
        "github:angular/bower-angular-animate@1.4.8": {
            "angular": "github:angular/bower-angular@1.4.8"
        },
        "github:angular/bower-angular-mocks@1.2.28": {
            "angular": "github:angular/bower-angular@1.2.28"
        },
        "github:angular/bower-angular-mocks@1.4.8": {
            "angular": "github:angular/bower-angular@1.4.8"
        },
        "github:angular/bower-angular-resource@1.4.8": {
            "angular": "github:angular/bower-angular@1.4.8"
        },
        "github:angular/bower-angular-route@1.4.8": {
            "angular": "github:angular/bower-angular@1.4.8"
        },
        "github:angular/bower-angular-sanitize@1.4.8": {
            "angular": "github:angular/bower-angular@1.4.8"
        },
        "github:jspm/nodelibs-assert@0.1.0": {
            "assert": "npm:assert@1.3.0"
        },
        "github:jspm/nodelibs-path@0.1.0": {
            "path-browserify": "npm:path-browserify@0.0.0"
        },
        "github:jspm/nodelibs-process@0.1.2": {
            "process": "npm:process@0.11.2"
        },
        "github:jspm/nodelibs-util@0.1.0": {
            "util": "npm:util@0.10.3"
        },
        "npm:assert@1.3.0": {
            "util": "npm:util@0.10.3"
        },
        "npm:babel-runtime@5.8.29": {
            "process": "github:jspm/nodelibs-process@0.1.2"
        },
        "npm:core-js@1.2.5": {
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.2",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:inherits@2.0.1": {
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:path-browserify@0.0.0": {
            "process": "github:jspm/nodelibs-process@0.1.2"
        },
        "npm:process@0.11.2": {
            "assert": "github:jspm/nodelibs-assert@0.1.0"
        },
        "npm:util@0.10.3": {
            "inherits": "npm:inherits@2.0.1",
            "process": "github:jspm/nodelibs-process@0.1.2"
        }
    }
});
/*eslint-enable */