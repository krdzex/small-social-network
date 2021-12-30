const path = require("path");
const htmlPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "src"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "main.js",
        publicPath: "/"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            title: "Membership Application",
            favicon: "./src/assets/images/paragon.png",
            template: "./src/template.js"
        })
    ]

}