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
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ["react-hot", "babel"],
      include: path.join(__dirname, "src")
    }]
  }
};
