#!/usr/bin/env node

/**
 * On a fresh clone, the local platforms/ and plugins/ directories will be
 * missing, so ensure they get created before the first platform is added.
 */
var sh   = require('shelljs'),
    path = require('path');

var platformsDir = path.resolve(__dirname, '../../platforms');
var pluginsDir = path.resolve(__dirname, '../../plugins');

sh.mkdir('-p', platformsDir);
sh.mkdir('-p', pluginsDir);
