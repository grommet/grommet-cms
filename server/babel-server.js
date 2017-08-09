/* eslint-disable */
require('babel-core/register');
require('babel-polyfill');
require('isomorphic-fetch');
require('./utils/ignoreAssets');
var env = require('node-env-file');
var path = require('path');

env(path.join(__dirname, '.env'));
var app = require(process.argv[2]);
