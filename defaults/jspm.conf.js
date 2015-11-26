System.config({
    baseURL: "/",
    defaultJSExtensions: true,
    transpiler: "traceur",
    paths: {
        "*": "scripts/*.js",
        "github:*": "jspm_components/github/*",
        "npm:*": "jspm_components/npm/*",
        "scripts/lib/*": "fear-core-app/scripts/lib/*"
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
        "lib/jquery.signalr": {
            "deps": [
                "lib/jquery"
            ]
        }
    },

    meta: {
        "lib/jquery": {
            "format": "global"
        }
    },

    map: {
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
        "babel": "npm:babel-core@5.8.33",
        "babel-runtime": "npm:babel-runtime@5.8.29",
        "core-js": "npm:core-js@1.2.5",
        "fastclick": "github:ftlabs/fastclick@1.0.3",
        "fear-core-app": "github:DigitalInnovation/fear-core-app@<%= appVersion %>",
        "lib/FearServiceBrokerAPI": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/FearServiceBrokerAPI",
        "lib/domQ": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/domQ",
        "lib/hd": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/hd",
        "lib/jquery": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/jquery",
        "lib/jquery.signalr": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/jquery.signalr-1.1.2",
        "signalr.hubs": "http://localhost:9100/signalr/hubs?",
        "lib/utils": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/lib/utils",
        "moment": "github:moment/moment@2.10.6",
        "packages/angular.package": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/packages/angular.package",
        "traceur": "github:jmcriffey/bower-traceur@0.0.91",
        "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.91",
        "underscore": "github:jashkenas/underscore@1.8.2",
        "usertiming": "github:nicjansma/usertiming.js@0.1.6",
        "github:angular/bower-angular-mocks@1.2.28": {
            "angular": "github:angular/bower-angular@1.2.28"
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
