'use strict';

var webpack = require('webpack'),
    path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/assets'),
    publicPath: '/assets/',
    filename: 'app.bundle.js'
  },
  debug: false,
  devtool: false,
  entry: './src/index.js',
  stats: {
    colors: true,
    reasons: false
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.sass/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
