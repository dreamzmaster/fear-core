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
