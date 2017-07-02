var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var sassLoader = [
  'style-loader',
  'css-loader',
  'sass-loader?sourceMap=true&sourceMapContents=true&includePaths[]=' +
  encodeURIComponent(path.resolve(__dirname, './src/styles')),
];

module.exports = {
  devtool: 'inline-source-map',

  entry: {
    app: './src/app.ts',
    vendors: [
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/router',
      'rxjs',
      'zone.js',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build/'
  },

  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true
        }
      }, {
        loader: 'angular2-template-loader'
      }, /* {
        loader: '@angularclass/hmr-loader',
      }*/],
      exclude: [/\.(spec|e2e)\.ts$/]
    }, {
      test: /\.scss$/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      use: sassLoader,
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader?sourceMap']
    }]
  },

  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react'),
    },
    extensions: ['.js', '.jsx', '.scss', '.css', '.ts'],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js',
    }),
    // 环境标志
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true,
      __DEVTOOLS__: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    hot: true,
    compress: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: {
      chunks: false,
    },
    host: "127.0.0.1",
    port: ${port}
  },
};