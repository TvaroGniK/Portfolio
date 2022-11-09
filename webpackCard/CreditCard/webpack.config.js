const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = (env) => ({
    entry: './src/js/index.js',
    output: {
        filename: 'main.[contenthash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use: {
                      loader: 'babel-loader',
                      options: {
                          presets: ['@babel/preset-env']
                      }
                  }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ttf|woff|woff2)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.scss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            }, 
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'PaySystem'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
    },
    optimization: {
        minimizer: [
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.squooshMinify,
              options: {
                encodeOptions: {
                  mozjpeg: {
                    // That setting might be close to lossless, but it’s not guaranteed
                    // https://github.com/GoogleChromeLabs/squoosh/issues/85
                    quality: 75,
                  },
                  webp: {
                    lossless: 1,
                  },
                  avif: {
                    // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
                    cqLevel: 0,
                  },
                },
              },
            },
          }),
        ],
      },
});