// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import webpack from 'webpack';
import path from 'path';
import env from 'node-env-file';

env(path.join(__dirname, '.env'));

const scssPath = (process.env.NODE_ENV !== 'production')
  ? 'assets/'
  : '';

export default {
  devTool: 'cheap-module-eval-source-map',
  base: '.',
  publicPath: '',
  dist: path.resolve(__dirname, 'dist/dashboard-assets'),
  copyAssets: [
    'src/index.html',
    'src/robots.txt',
    {
      asset: 'src/img/**',
      dist: 'dist/dashboard-assets/img/'
    },
    {
      asset: 'node_modules/grommet/*.min.js',
      dist: 'dist/dashboard-assets/latest/'
    },
    {
      asset: 'node_modules/grommet/*.min.css',
      dist: 'dist/dashboard-assets/latest/css/'
    },
    {
      asset: 'node_modules/grommet/img/**',
      dist: 'dist/dashboard-assets/img/'
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: ['src/**/*.js'],
  mainJs: 'src/index.js',
  mainScss: 'src/scss/index.scss',
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, './node_modules'),
        path.resolve(__dirname, './src')
      ],
      alias: {
        'grommet-cms': path.resolve(__dirname, './src/js/'),
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })
    ],
    module: {
      preLoaders: [{
        test: /\.jsx?$/,
        loader: 'remove-flow-types',
        include: path.join(__dirname, './src')
      }],
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: /node_modules\/hpe-digitaltoolkit/
        },
        {
          test: /\.svg$/,
          loader: 'url-loader?limit=10000'
        },
        {
          test: /\.md$/,
          loader: "html!markdown"
        }
      ]
    }
  },
  scssLoader: {
    test: /\.scss$/,
    loader: `file?name=${scssPath}css/[name].css!sass?` +
      'includePaths[]=' +
      (encodeURIComponent(
        path.resolve(process.cwd(), './node_modules')
      )) +
      '&includePaths[]=' +
      (encodeURIComponent(
        path.resolve(process.cwd(),
        './node_modules/grommet/node_modules'))
      )
  },
  devServerPort: 8003,
  //devServerHost: "10.0.0.1",
  devServerProxy: {
    "/uploads/media/*": 'http://localhost:8000',
    "/api/image/*": 'http://localhost:8000'
  },
  scsslint: true,
  hot: true,
  inline: true,
  alias: {
    'grommet/scss': path.resolve(__dirname, '../grommet/src/scss'),
    'grommet': path.resolve(__dirname, '../grommet/src/js')
  },
  devPreprocess: [
    'set-webpack-alias'
  ],
  distPreprocess: [
    'set-webpack-alias'
  ]
};
