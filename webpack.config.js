const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const m = process.env.MODULE;

module.exports = {
  entry: `./public/js/index.js`,
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        },
      },
      { test: /\.css$/,
        loaders: ['style-loader', 'css-loader'] 
      },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
     
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./public/index.html`,
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};