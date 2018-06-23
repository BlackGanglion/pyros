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

  performance: {
    hints: false,
  },

  entry: {
    app: './src/app',
    vendors: ['react', 'react-dom'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build/'
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'ts-loader'
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
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css', '.less'],
  },

  plugins: [
    new webpack.optimize.RuntimeChunkPlugin({
      name: "vendors" // 指定公共 bundle 的名称
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
