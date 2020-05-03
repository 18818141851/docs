const webpack=require('webpack');
const path=require('path');
module.exports={
    mode:"production",
    entry:{
        "static-module":[
            'react',
            'react-dom'
        ]
    },
    output:{
        path: path.join(__dirname, './dll'),
        filename: '[name].dll.js',
        library: 'coding'
    },
    plugins: [
    new webpack.DllPlugin({
        name:"[name]-dll",
        path:path.join(__dirname, './dll','[name]-manifest.json')   
    })
    ]
}