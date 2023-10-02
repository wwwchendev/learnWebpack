const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    //mode: 'development',
    //mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                MiniCssExtractPlugin.loader,
                // "style-loader",
                "css-loader",
                "sass-loader",
                ],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                    ]
                    }
                }
            },
            {
                test: /\.gif/,
                type: 'asset/resource'
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
        template:"./src/index.html"
        }),
        new MiniCssExtractPlugin({ 
        filename: 'main-[hash].css'
        })
    ],
};
