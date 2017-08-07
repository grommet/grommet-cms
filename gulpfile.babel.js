// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import yargs from 'yargs';
const argv = yargs.argv;
import gulp from 'gulp';
import grommetToolbox, { getOptions } from 'grommet-toolbox';
import webpack from 'webpack';

const options = getOptions();
var host = options.devServerHost ? options.devServerHost : 'localhost';

gulp.task('set-webpack-alias', function () {
  if (options.alias && argv.useAlias) {
    console.log('Using local alias for development.');
    options.webpack.resolve.alias = options.alias;
  }
});

grommetToolbox(gulp, options);
