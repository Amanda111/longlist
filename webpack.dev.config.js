var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'main.js': ['./js/list.js', 'webpack-hot-middleware/client']
  },
  output: {
    path:'/',
    // path: path.join(__dirname,'./build'),
    publicPath: 'http://localhost:3000/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [      
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,     
      loader: 'url-loader'
    },
    {
        test: /\.vue$/,
        loader: 'vue'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.scss']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
