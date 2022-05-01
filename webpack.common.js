const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const pages = ["index", "booking", "index-de", "booking-de", "coming-soon", "experience"]
const languages = ["de", "cz"]

module.exports = {
    entry: pages.reduce((config, page) => {
        let jsName = page
        config[page] = `./src/${jsName}.js`
        return config
    }, {}),
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [].concat(
        pages.map(
            (page) =>
                new HtmlWebpackPlugin({
                    inject: true,
                    template: `./${page}.html`,
                    filename: `${page}.html`,
                    chunks: [page],
                })
        )
    ),
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg|JPG|JPEG|mp4)$/,
                type: "asset/resource"
            },
            {
                type: "javascript/auto",
                test: /\.json$/,
                include: /(lottie)/,
                loader: "lottie-web-webpack-loader",
                options: {
                    assets: {
                        scale: 0.5 // proportional resizing multiplier
                    }
                }
            }
        ],
    },
}
