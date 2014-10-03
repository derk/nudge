	# Nudge by Buddi App

[![Dependency Status](https://david-dm.org/rosterloh/nudge.svg)](https://david-dm.org/rosterloh/nudge)
[![devDependency Status](https://david-dm.org/rosterloh/nudge/dev-status.svg)](https://david-dm.org/rosterloh/nudge#info=devDependencies)

## Tools required
  * [Node.js](http://nodejs.org/)
  * [Apache Ant](http://ant.apache.org/)
  * [Apache Cordova](http://cordova.apache.org/)
  * [Ionic Framework](http://ionicframework.com/)
  * `$ npm install -g cordova ionic`

## Getting Started Developing
1. Clone the repository
  `$ git clone https://github.com/rosterloh/nudge.git`
2. Install utilities
  `$ npm install -g bower cordova ionic`
3. Install dependencies
  `$ npm install`
4. Install bower components
  `$ bower install`
5. Build the application files
  `$ gulp build`

## Adding Required Plugins
```bash
$ gulp install-plugins
```

## Building and running
Platforms are: `ios` or `android`

1. Add cordova platform
   `ionic platform add <platform>`
2. Start the application on a connected device
   `ionic run <platform>`

For all the other ionic commands see `$ ionic --help`

## Debugging
```bash
  $ adb logcat -s CordovaLog
  $ ionic run android -l -c -s
```
`$ ionic emulate android`
