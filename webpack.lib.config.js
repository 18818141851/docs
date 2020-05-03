const webpack=require('webpack');
const path=require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports={
    mode:"production",//development//production
    entry:{
        "index":'./src/index'
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
    output:{
        path: path.join(__dirname, './lib'),
        filename: '[name].js',
        library: 'coding',
        libraryTarget:'umd'
    },
    plugins: [
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dll/static-module-manifest.json')
    })
    ],
    optimization:{
      minimizer:[
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
              compress: true,
              ecma: 5,
              mangle: true,
              ie8: true,
              safari10: true,
              output: {
                  comments: false
              }
          },
          sourceMap: false
      })
      ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
}