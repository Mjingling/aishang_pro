var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
    app: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "script/[name].[hash].js",
    publicPath: "./"
  },
  plugins:[
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CleanWebpackPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './static'),
      to: path.resolve(__dirname, "./dist"),
      ignore: ['.*']
    }])
  ]
};
