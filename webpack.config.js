var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/index.js' ,
    output: {
        filename: 'index.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [ new webpack.NoErrorsPlugin() ],
    watch: process.env.NODE_ENV === 'development'
};
