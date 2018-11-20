const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    
    // specifies the base path for your application...
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules:[
      {test: /\.(css)$/, use: ['style-loader', 'css-loader']},
      {test: /\.(js)$/, use: ['babel-loader']}
    ]
  },

  // does the redirect to output.publicPath in case a url does not match any routes...
  devServer:{
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}