/* eslint-env node */

var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "eval",
  entry: [
    // "webpack-dev-server/client?http://localhost:3000",
    // "webpack/hot/only-dev-server",
    "./src/index.jsx"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
    // fallback: path.join(__dirname, "node_modules/bootstrap/css")
    modulesDirectories: ["web_modules", "node_modules", path.join(__dirname, "node_modules/bootstrap/dist/css")]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ["react-hot", "babel"],
        include: path.join(__dirname, "src")
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  }
};
