const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: ['./src/index.js','./scss/main.scss'],
    output: {
        path: __dirname+'/public',
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                loader:ExtractTextPlugin.extract('css-loader!sass-loader')
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            BASE_URL: 'http://localhost:3030/'
        }),
        new ExtractTextPlugin({ // define where to save the file
            filename: './bundle.css',
            allChunks: true,
        })
    ]
};