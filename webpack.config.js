//var AnyBarWebpackPlugin = require('anybar-webpack');

var isProd = process.env.NODE_ENV === 'production';

var config = {
    entry: {
        app: [
            './app/assets/app.js'
        ]
    },
    output: {
        path: './app/build/assets',
        publicPath: '/build/assets/', // important path for defining where from to serve bundle from memory
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel!jscs-loader!jshint-loader'
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'style-loader!css-loader!cssnext-loader'
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                loader: "html"
            },
            {
                test: /.*\.svg$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'file-loader',
                    'svgo-loader'
                ]
            }
        ]
    },
    cssnext: {
        browsers: ['last 2 versions', 'IE 10', 'Firefox ESR', 'Opera 12.1']
    },
    devServer: {
        contentBase: "./app"
    },
    plugins: []
};

if (!isProd) {
    //config.plugins.push(new AnyBarWebpackPlugin());
    config.devtool = 'cheap-source-map'
}

module.exports = config;
