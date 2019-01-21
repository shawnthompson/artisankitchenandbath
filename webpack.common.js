const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
          { 
            loader : 'html-loader' 
          },
          {
            loader : 'assemble-webpack-loader',
            options : {
              layouts : path.resolve ('./src/html/layouts/**/*.hbs'),
              partials : path.resolve ('./src/html/partials/**/*.hbs'),
              define : {
                __TEST__ : 'test'
              }
            }
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use : [
          {
            loader : 'file-loader',
            options : {name: '[name].[ext]',outputPath: 'img'}
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
    }),
    new CopyWebpackPlugin([
      {
        from : path.resolve('./src/img'),
        to : path.resolve('./dist/img')
      }
    ])
  ]
}