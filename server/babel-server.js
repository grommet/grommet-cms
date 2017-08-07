require('babel-register');
require('babel-polyfill');
require('./utils/ignoreAssets');
// Environment Variables
require('node-env-file');
env(path.join(__dirname, '..', '.env'));

require('./server.js');
