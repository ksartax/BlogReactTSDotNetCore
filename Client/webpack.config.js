var HtmlWebpackPlugin = require('html-webpack-plugin');
var RefreshBrowserPlugin = require('refresh-browser-webpack-plugin');

module.exports = {
    entry: __dirname + '/src/app' + '/index.tsx',
    output: {
        path: __dirname + '/src/public',
        filename: './bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true
                        },
                    }
                ],
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".jsx", ".js", ".tsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/public/index.html'
        }),
        new RefreshBrowserPlugin(),
    ]
};
