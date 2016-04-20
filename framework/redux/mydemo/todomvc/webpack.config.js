var webpack = require('webpack');

module.exports = {
    entry: [
        './index'
    ],
    output: {
        path: './dest/',
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }]
    }
}
