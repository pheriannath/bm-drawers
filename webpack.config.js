'use strict';

/***********************************************************************************************************************************************
 * FYC PUBLIC - WEBPACK
 ***********************************************************************************************************************************************
 * @description
 */
const webpack = require('webpack');
const html = require('html-webpack-plugin');
const dotenv = require('dotenv-webpack');
const path = require('path');

/**
 * Input files
 * @type {Object}
 */
const inputs = {
  config: path.join(__dirname, '.env'),
  js: path.join(__dirname, 'index.js'),
  html: path.join(__dirname, 'index.html')};

/**
 * Output paths
 * @type {Object}
 */
const outputs = {path: path.join(__dirname, 'dist')};

/**
 * [exports description]
 * @param  {Object} [env={}]    [description]
 * @param  {Object} [define={}] [description]
 * @return {[type]}             [description]
 */
module.exports = (env={}, define={}) => {

  return Object.assign({
    entry: {main: inputs.js},
    output: {
      filename: '[name].[hash].js',
      path: outputs.path
    },
    module: {
      rules: [
        { test: /\.(js)$/, loader: "babel-loader", query: {compact: false}},
        {
          test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg|gif)(\?[a-z0-9=.]+)?$/,
          loader: 'url-loader?limit=100000'
        },
        { test: /\.(css|scss|sass)?$/, use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
        },
        {
          test: /\.ico$/,
          loader: 'file-loader?name=[name].[ext]'
        }
      ]
    },
    devServer: {
      https: true,
      port: env.port || 3000,
      contentBase: path.join(__dirname, 'dist'),
      disableHostCheck: true
    },
    target: 'web',
    node: {
      __dirname: true,
      net: "empty",
      dns: "empty",
      fs: "empty"
    },
    resolve: {
      alias: {
        '~': path.join(__dirname)
      }
    },
    mode: env.production? 'production' : 'development',
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
        default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
      }
    },
    plugins: [
      new html({template: inputs.html}),
      new dotenv({path: inputs.config}),
      new webpack.EnvironmentPlugin({
        // env keys here from CLI
      }),
      new webpack.ProvidePlugin({
        // globally expose modules
     })
    ]
  }, (!env.production || env.sourcemaps ? {devtool: 'source-map'} : {}));
}
