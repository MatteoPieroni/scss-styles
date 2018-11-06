const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        // using js to keep a faster compilation
        AC: './index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ],
    module: {
        rules: [
            {
                test: /.scss?$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    }, {
                        loader: "css-loader",
                    }, {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('autoprefixer'),
                                require('cssnano')({
                                    preset: 'default',
                                }),
                            ]
                        }
                    }, {
                        loader: "sass-loader",
                    }, {
                        // adds the utilities files to each single sass file
                        loader: "sass-resources-loader",
                        options: {
                            // utilities files to be added in the file below
                            resources: require(path.join(process.cwd(), "src/scss/utilities/utilities.js")),
                        },
                    },
                ],
            }
        ]
    }
};