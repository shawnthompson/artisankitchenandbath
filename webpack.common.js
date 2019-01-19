const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry : {
    app : './src/js/script.js'
  },
  output : {
      filename : 'artisan.js',
      path : path.resolve(__dirname, 'dist')
  },
  plugins : [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        title : 'My killer app'
    })
  ]
}