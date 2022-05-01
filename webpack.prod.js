const path = require('path')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./assets/js/[name].[fullhash].bundle.js",
        assetModuleFilename: './assets/images/[name].[ext]'
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "./assets/css/[name].[fullhash].css" }),
        new CleanWebpackPlugin()
    ],
    module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        },
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        }
    ]
}
})
