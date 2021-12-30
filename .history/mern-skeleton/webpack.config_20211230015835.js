const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
    mode: "development",
    entry: path.join(__dirname, "./src/server.js"),
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "main.js"
    },
    externals: [nodeExternals()],
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
    target: 'node',
}