const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

let conf = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        hot: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: "Товарооборот",
          filename: 'index.html',
          template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
        rules: [
            {
              test: /\.html$/i,
              use: 'raw-loader'
            },
            {
              test: /\.css$/i,
              use: [
                  MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader'
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: { plugins: [ require("autoprefixer")() ] }
                  }
                }
              ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
              test: /\.(png|svg|jpg|jpeg|webp|woff|woff2|webmanifest)$/i,
              type: 'asset/resource',
              generator: {
               filename: '[name][ext]'
             }
            }
        ]
    },
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                test: /\.css$/
            })
        ]
    }
};

module.exports = (env) => {
    conf.devtool = process.env.NODE_ENV === 'development' ? "eval-source-map" : false;

    return conf;
}
