Parent module responsible currently for installing child modules from applications package.json fearDependencies property. Package.json would contain the following for example:

```
{
  "fear": {
    "jspm": {
      "app": "1.0.0"
    },
    "dependencies": {
      "tasks": "latest",
      "ui": "latest"
    },
    "devDependencies": {
      "serve": "latest"
    }
  },
    "dependencies": {
    "fear-core": "1.1.2"
  }
}

```
fearDependencies currently available are:

* [fear-core-app](https://digitalinnovation.github.io/fear-core-app)
* [fear-core-ui](https://digitalinnovation.github.io/fear-core-ui)
* [fear-core-serve](https://digitalinnovation.github.io/fear-core-serve)
* [fear-core-tasks](https://digitalinnovation.github.io/fear-core-tasks)
* [fear-core-eslint-config](https://digitalinnovation.github.io/fear-core-eslint-config)
