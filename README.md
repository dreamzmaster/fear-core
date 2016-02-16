Parent module responsible currently for installing child modules from applications package.json fearDependencies property. 
If no parent application is present then installing fear-core will scaffold a recommended (but then configurable) application with some default tasks. **_Please note scaffold functionality is under development and currently is for demonstration purposes only._**

###**Package.json**
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
###**Installation**
Modules can be installed from the command line like this

```bash
npm install
npm install --fear=dev
npm install --fear=dev,build
```
###**Runtime**
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

###**Available modules**

* [fear-core-app](https://digitalinnovation.github.io/fear-core-app)
* [fear-core-ui](https://digitalinnovation.github.io/fear-core-ui)
* [fear-core-serve](https://digitalinnovation.github.io/fear-core-serve) *(currently installed by default as part of fear-core)*
* [fear-core-build](https://digitalinnovation.github.io/fear-core-build)
* [fear-core-dev](https://digitalinnovation.github.io/fear-core-dev)
* [fear-core-aut](https://digitalinnovation.github.io/fear-core-aut)

###**Further reading**

* [Website](http://digitalinnovation.github.io/fear-core)
* [Technical documentation](http://digitalinnovation.github.io/fear-core/docs/)
* [Wiki](https://github.com/DigitalInnovation/fear-core/wiki)

