const webpack=require('webpack');
const path=require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports={
    mode:"production",//development//production,
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
              test: /\.html$/,
              exclude: /^node_modules$/,
              use: [
                {
                  loader: 'html-loader',
                  options: { minimize: true }
                }
              ]
            },
            {
                test: /\.less$/,
                exclude: /^node_modules$/,
                use: [
                  "css-loader",
                    "less-loader"
                ]
            }
            // {
            //   test: /\.(less|css)$/,
            //   exclude: /^node_modules$/,
            //   use: [{
            //     loader: "style-loader" 
            // },{
            //     loader: "css-loader" 
            // },{
            //     loader: "less-loader"
            // }]
            // }
          ]
    },
    output:{
        path: path.join(__dirname, './lib'),
        filename: '[name].js',
        library: 'coding',
        libraryTarget:'umd',
        umdNamedDefine: true
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
      },
    externals:[]
}