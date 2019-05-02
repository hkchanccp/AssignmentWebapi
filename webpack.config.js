require('dotenv').config();
const {VueLoaderPlugin} = require('vue-loader');
const webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV || "none",
    entry: './public/src/main.js',
    output: {
        path: `${__dirname}/public/dist/js/`,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        //
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        alias: {
            //
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
         }),
    ],
}