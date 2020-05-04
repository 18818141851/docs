const webpack=require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry:{
    "app":"./src/App"
  },
    module: {
      rules: [
        {
          test: /\.tsx|\.ts$/,
          exclude: /^node_modules$/,
          use: 'awesome-typescript-loader'
      },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dll/static-module-manifest.json')
    }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
    ]
  }