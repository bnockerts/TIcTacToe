'use strict';

var webpack = require('webpack'),
    path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/assets'),
    publicPath: '/assets/',
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: 3000,
    publicPath: '/assets/',
    noInfo: false
  },
  cache: true,
  debug: true,
  devtool: 'eval-source-map',
  entry: [
      './src/index.js'
  ],
  stats: {
    colors: true,
    reasons: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: './src',
        loader: 'eslint-loader'
      }
    ],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel-loader'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
