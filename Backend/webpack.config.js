const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    devtool: "cource-map",
    devtool: '#eval-source-map',

    resolve: {
        extensions: [".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },

    devServer: {
        historyApiFallback: true,
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html"
        })
    ]
};
