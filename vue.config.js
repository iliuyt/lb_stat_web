const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

let plugins = [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)];
if (process.env.NODE_ENV === "prod") {
    plugins.push(
        new BundleAnalyzerPlugin(),
        new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: productionGzipExtensions,
            threshold: 2048,
            minRatio: 0.8,
        })
    );
}
module.exports = {
    lintOnSave: false,
    pages: {
        home: {
            // page 的入口
            entry: "src/pages/home/main.js",
            // 模板来源
            template: "public/home.html",
            // 在 dist 的输出
            filename: "home.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "home"],
        },
        other: {
            // page 的入口
            entry: "src/pages/other/main.js",
            // 模板来源
            template: "public/index.html",
            // 在 dist 的输出
            filename: "other.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "other"],
        },
        vaccine: {
            // page 的入口
            entry: "src/pages/vaccine/main.js",
            // 模板来源
            template: "public/index.html",
            // 在 dist 的输出
            filename: "vaccine.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "vaccine"],
        },
        vaccine_stat: {
            // page 的入口
            entry: "src/pages/vaccine_stat/main.js",
            // 模板来源
            template: "public/index.html",
            // 在 dist 的输出
            filename: "vaccine_stat.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "vaccine_stat"],
        },
        grid: {
            // page 的入口
            entry: "src/pages/grid/main.js",
            // 模板来源
            template: "public/index.html",
            // 在 dist 的输出
            filename: "grid.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "grid"],
        }
    },
    configureWebpack: {
        plugins: plugins,
    },
    devServer: {
        disableHostCheck: true,
    },
};
