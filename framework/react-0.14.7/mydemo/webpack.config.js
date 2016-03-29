module.exports = {
    entry: './main.jsx',
    output: {
        filename: './webpack.bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.js|jsx$/, loaders: ['babel-core']}
        ]
    }
};