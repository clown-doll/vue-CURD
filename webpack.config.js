/*
* @Author: Administrator
* @Date:   2016-07-08 10:26:14
* @Last Modified by:   Administrator
* @Last Modified time: 2016-07-08 13:33:47
*/

var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vue = require("vue-multi-loader");

module.exports = {
    // 入口文件地址
    entry: "./src/main.js",
    // 输出
    output: {
        path: "./dist",
        filename: "build.js"
    },
    // 加载器
    module: {
        // 加载器
        loaders: [
            // 解析.vue文件
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: vue.withLoaders({
                    css: ExtractTextPlugin.extract("css")
                })
            },
            // 编译css
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css", {allChunks: true}),
        new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
    ],
    // 服务器配置相关，自动刷新!
    devServer: {
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true
    }
}