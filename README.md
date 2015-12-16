# fear-core
Parent module responsible currently for installing child modules from applications package.json fearDependencies property. Package.json would contain the following for example:

```
{
  "fearDependencies": {
    "tasks": "1.0.0",
    "serve": "1.0.0",
    "app": "1.0.0"
  },
    "dependencies": {
    "fear-core": "DigitalInnovation/fear-core#development"
  }
}
```
fearDependencies currently available are:

[fear-core-app](https://github.com/DigitalInnovation/fear-core-app)
[fear-core-ui](https://github.com/DigitalInnovation/fear-core-ui)
[fear-core-serve](https://github.com/DigitalInnovation/fear-core-serve)
[fear-core-tasks](https://github.com/DigitalInnovation/fear-core-tasks)
[fear-core-eslint-config](https://github.com/DigitalInnovation/fear-core-eslint-config)
