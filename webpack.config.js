var webpack = require('webpack');
var dev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index',
    output: {
        path: './lib',
        filename: 'index.js',
        libraryTarget: 'umd',
        sourceMapFilename: 'index.map.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'stage-0', 'es2015']
                }
            }
        ]
    },
    watch: dev,
    plugins: dev ? [] : [
        new webpack.optimize.UglifyJsPlugin()
    ],
    devtool: 'source-map'
}
