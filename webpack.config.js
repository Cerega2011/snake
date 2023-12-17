const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        menu: "./js/menu.js",
        game: "./js/game.js",
        settings: './js/settings.js'
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            chunks: ["menu"],
        }),
        new HtmlWebpackPlugin({
            template: "./game.html",
            filename: "game.html",
            chunks: ["game"],
        }),
        new HtmlWebpackPlugin({
            template: "./settings.html",
            filename: "settings.html",
            chunks: ["settings"],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "css", to: "css" },
                { from: "images", to: "images" },
                { from: "sounds", to: "sounds" },
            ],
        }),
    ],
};