Parent module responsible currently for installing child modules from applications package.json fearDependencies property. 
If no parent application is present then installing fear-core will scaffold a recommended (but then configurable) application with some default tasks. **_Please note scaffold functionality is under development and currently is for demonstration purposes only._**

### **Package.json**
Package.json could contain the following for example:

```
{
  "fear": {
    "jspm": {
      "app": "1.0.1"
    },
    "dependencies": {
      "build": {
        "version": "latest",
        "tasks": true
      },
      "dev": {
        "version": "latest",
        "tasks": true
      },
      "aut": {
        "version": "latest",
        "tasks": true
      }
    }
  },
  "dependencies": {
    "fear-core": "1.1.2"
  }
}
```

### **Installation**
Modules can be installed from the command line. For fear modules npm install or npm update perform the same action - install module if not present or a newer version is specified in fear section of package.json and an older version is currently installed.

```bash
npm install/update --fear=dev
npm install/update --fear=dev,build
```

The following files will always be copied and overwrite the existing files to the parent application:

```
config/development/pages/core.js
preinstall.js
app/common/scripts/jspm.conf.js
test/jspm.conf.js
config/integrated/jspm.conf.js
gulpfile.js
```

The following will be copied to the parent application only if they don't already exist (i.e a new application is being created):

```
config
tasks
mock
app/common
.editorconfig
.eslintrc
.eslintignore
.gitignore
```

### **Runtime**
This then dynamically creates the application gulp file so that the correct tasks are made available. So ```npm install --fear=dev``` would create the following gulpfile.js in the application root:

```javascript
require('./tasks/base.js');

//tasks
//build has not been installed
require('./tasks/dev')();
//aut has not been installed

//core tasks
require('./tasks/core')();
require('./tasks/serve')();
```

This means that it is possible to have CI load only the module that contains the tasks it needs to run and can run these independently making these processes run as fast as possible.

### **Available modules**

* [fear-core-app](https://github.com/DigitalInnovation/fear-core-app)
* [fear-core-ui](https://digitalinnovation.github.io/fear-core-ui)
* [fear-core-serve](https://digitalinnovation.github.io/fear-core-serve) *(installed by default as part of fear-core)*
* [fear-core-build](https://digitalinnovation.github.io/fear-core-build)
* [fear-core-dev](https://digitalinnovation.github.io/fear-core-dev)
* [fear-core-aut](https://digitalinnovation.github.io/fear-core-aut)
* [fear-core-docker](https://digitalinnovation.github.io/fear-core-docker) *(installed by default as part of fear-core-aut)*

### **Further reading**

* [Website](http://digitalinnovation.github.io/fear-core)
* [Technical documentation](http://digitalinnovation.github.io/fear-core/docs/)
* [Wiki](https://github.com/DigitalInnovation/fear-core/wiki)

