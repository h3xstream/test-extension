const WebExtension = require('webpack-target-webextension');
const CopyPlugin = require("copy-webpack-plugin");

const webpack = require('webpack');
const path = require('path');

/** @type {webpack.Configuration} */
const config = {
  // No eval allowed in MV3
  devtool: 'cheap-source-map',
  entry: {
    background: path.join(__dirname, './src/background.js'),
    options: path.join(__dirname, './src/options.js'),
    popup:  path.join(__dirname, './src/popup.js'),
  },
  optimization: {
    minimize: false,
  },
  output: {
    path: path.join(__dirname, './dist'),
    // Our assets are emitted in /dist folder of our web extension.
    publicPath: '/dist/',
  },
  resolve: {
    alias: {
      core: path.join(__dirname, 'background'),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/manifest.json"},
        {
          from: "src/*.html",
          to({ context, absoluteFilename }) {
            return "./[name][ext]";
          },
        }
      ],
    }),
    new WebExtension({
      background: {
        entry: 'background',
        manifest: 3,
        weakRuntimeCheck: true,
      },
    }),
  ],
  // Add devServer.hot = true or "only" to enable HMR.
  devServer: {
    hot: 'only',
  },
}
module.exports = config
