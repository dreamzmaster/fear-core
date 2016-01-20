/*eslint-disable */
System.config({
    baseURL: "/",
    defaultJSExtensions: true,
    transpiler: "babel",
    babelOptions: {
        "optional": [
            "runtime",
            "optimisation.modules.system"
        ]
    },
    paths: {
        "common/*": mnsScriptLocation + "common/*.js",
        "browse/*": mnsScriptLocation + "browse/*.js",
        "bandc/*": mnsScriptLocation + "bandc/*.js",
        "core/*": mnsScriptLocation + "jspm_components/github/DigitalInnovation/fear-core-app@1.0.0/*.js",
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
        ]
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
        "babel": "npm:babel-core@5.8.25",
        "babel-runtime": "npm:babel-runtime@5.8.24",
        "core-js": "npm:core-js@1.1.4",
        "fastclick": "github:ftlabs/fastclick@1.0.3",
        "packages/angular.package": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/packages/angular-1.2.28.package",
        "packages/angular-1.4.8.package": "github:DigitalInnovation/fear-core-app@<%= appVersion %>/scripts/packages/angular-1.4.8.package",
        "moment": "github:moment/moment@2.10.6",
        "signalr.hubs": "http://localhost:9100/signalr/hubs?",
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
/*eslint-enable */
