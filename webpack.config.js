const path = require('path');
const webpack = require('webpack');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const env = process.env.NODE_ENV || 'development';
console.log("configured for", env);

// TODO: cleanup dist dir before a new bundle is written
const shared = {
  entry: {
    'bundle': [
      './src/main.js'
    ],
    'styles': [
      './src/main.css'
    ]
  },
  rules: [
    {
      test: /\.(js|jsx)$/, // test to match files
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [ 'css-loader', 'postcss-loader' ]
      })
    },
  ]
}

const dev = {
  entry: shared.entry,

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public/'),
    publicPath: '/dist/'
  },

  devServer: {
    contentBase: 'public'
  },

  rules: shared.rules,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin("styles.css"),
  ]
}

const prod = {
  entry: shared.entry,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, './public/dist/'),
    publicPath: '/dist/'
  },
  rules: shared.rules,
  plugins: [

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    //
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ["manifest"], //
    //   minChunks: Infinity,
    // }),

    // new ChunkManifestPlugin({
    //   filename: 'chunk-manifest.json',
    //   manifestVariable: 'webpackManifest',
    // }),

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

    new ExtractTextPlugin("styles.css"),
  ]
}

const config = (env === 'development') ? dev : prod;

module.exports = {
  entry: config.entry,
  output: config.output,
  resolve: {
    extensions: ['.js', '.json', '.css'], // extensions that are used

    alias: {
      'npm': path.resolve(__dirname, './node_modules/')
    }
  },

  devtool: (env === 'development') ? 'inline-source-map' : '',

  module: {
    rules: config.rules,
  },

  plugins: config.plugins,
}
