/* eslint-disable */
require('babel-core/register');
require('babel-polyfill');
require('isomorphic-fetch');
require('./server/utils/ignoreAssets');

var env = require('node-env-file');
var path = require('path');
var app = require(process.argv[2]);

env(path.join(__dirname, '.env'));