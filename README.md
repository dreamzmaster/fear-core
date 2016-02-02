Parent module responsible currently for installing child modules from applications package.json fearDependencies property. Package.json would contain the following for example:

```
{
  "fear": {
    "jspm": {
      "app": "1.0.0"
    },
    "dependencies": {
      "build": "latest",
      "ui": "latest",
      "dev": "latest",
      "aut": "latest"
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
* [fear-core-build](https://digitalinnovation.github.io/fear-core-build)
* [fear-core-dev](https://digitalinnovation.github.io/fear-core-dev)
* [fear-core-aut](https://digitalinnovation.github.io/fear-core-aut)
* [fear-core-eslint-config](https://digitalinnovation.github.io/fear-core-eslint-config)
