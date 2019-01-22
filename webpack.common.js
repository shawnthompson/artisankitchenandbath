const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const assembleWebpack = require('assemble-webpack');
const handlebarsHelpers = require('handlebars-helpers');

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
            loader : 'assemble-webpack',
          }
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
    new CopyWebpackPlugin([
      {
        from : path.resolve('./src/img'),
        to : path.resolve('./dist/img')
      }
    ]),
    new assembleWebpack.AttachedPlugin({ // assemble demo https://github.com/raviroshan/assemble-webpack-demo
      baseLayout: ['./src/html/layouts/**/*.hbs'],
      basePages: ['./src/html/pages/**/*.hbs'],
      partialsLayout: ['./src/html/partials/**/*.hbs'],
      partialsData: [
        './src/html/data/partials/**/*.json',
        './src/html/data/layouts/**/*.json',
        './src/html/data/pages/**/*.json'
      ],
      helpers: [handlebarsHelpers(), './src/html/helpers/custom-helpers.js']
    })
  ]
}