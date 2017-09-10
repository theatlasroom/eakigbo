const path = require('path');
const webpack = require('webpack');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
console.log("configured for", env);

// TODO: cleanup dist dir before a new bundle is written

const dev = {
  entry: {
    'bundle': [
      'webpack-hot-middleware/client',
      './app.js',
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public/build/'),
    publicPath: '/'
  },

  rules: [
    {
      test: /\.(js|jsx)$/, // test to match files
      use: 'babel-loader', // plugin to tranform the files that match
      exclude: /node_modules/
    },
    { test: /\.css/, use: [ 'style-loader', 'css-loader' ]}
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

const prod = {
  entry: {
    'bundle': './app.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './public/dist/'),
    publicPath: '/dist/'
  },
  rules: [
    {
      test: /\.(js)$/, // test to match files
      use: 'babel-loader', // plugin to tranform the files that match
      exclude: /node_modules/
    },
    { test: /\.css/, use: [ 'style-loader', 'css-loader' ]}
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ["manifest"], //
      minChunks: Infinity,
    }),

    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),

    new webpack.optimize.UglifyJsPlugin({
      // Eliminate comments
      comments: false,

      // Compression specific options
       compress: {
         // remove warnings
        warnings: false,

         // Drop console statements
        drop_console: true
       },
    }),
    new webpack.SourceMapDevToolPlugin(),
  ]
}

const config = (env === 'development') ? dev : prod;

module.exports = {
  entry: config.entry,
  output: config.output,
  resolve: {
    extensions: ['.js', '.json', '.css'], // extensions that are used
  },

  devtool: (env === 'development') ? 'inline-source-map' : '',

  module: {
    rules: config.rules,
  },

  plugins: config.plugins,
}
