# Nudge by Buddi App

[![Dependency Status](https://david-dm.org/rosterloh/nudge.svg)](https://david-dm.org/rosterloh/nudge)
[![devDependency Status](https://david-dm.org/rosterloh/nudge/dev-status.svg)](https://david-dm.org/rosterloh/nudge#info=devDependencies)

## Currently supported platforms
 * Android

## Tools required
  * [Node.js](http://nodejs.org/)
  * [Apache Ant](http://ant.apache.org/)
  * [Apache Cordova](http://cordova.apache.org/)
  * [Ionic Framework](http://ionicframework.com/)
  * `$ npm install -g cordova ionic`

## Building and running (Android)
  * `$ ionic build android`
  * `$ ionic emulate android`

## Debugging
```bash
  $ adb logcat -s CordovaLog
  $ ionic run android -l -c -s
```
