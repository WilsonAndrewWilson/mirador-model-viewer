const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function(env, argv) {
  return {
    mode: env && env.production ? 'production' : 'development',
    devServer: {
      open: true,
      contentBase: path.resolve(__dirname),
      publicPath: '/dist/',
    },
    devtool: env && env.production ? 'source-map' : 'eval-source-map',
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        }
      ]
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/', //this would need to be something like /saerch/js/mirador-3-3d or wherever your deployed js directory is
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /@blueprintjs\/(core|icons)/, // ignore optional UI framework dependencies
      }),
    ],
    resolve: {
      fallback: {
        "url": false
      }
    },
  }
};
