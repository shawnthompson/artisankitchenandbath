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
  module : {
    rules : [
      {
        test : /\.hbs$/,
        use : [
          { loader : 'html-loader' },
          {
            loader : 'assemble-webpack-loader',
            options : {
              layouts : path.resolve ('./src/html/layouts/**/*.hbs'),
              partials : path.resolve ('./src/html/partials/**/*.hbs'),
              define : {
                __TEST__ : 'test'
              }
            }
          }
        ]
      }
    ]
  },
  plugins : [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template : path.resolve('./src/html/pages/index.hbs'),
      filename : 'index.html'
    })
  ]
}