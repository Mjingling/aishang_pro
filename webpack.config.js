var path = require("path");
var webpack = require("webpack");
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
  devServer: {
    port:8000,
    hot: true,
    watchContentBase: true,
    publicPath: "/",
    open: true,
    // overlay: true,
    compress: true,
    progress: true,
    // host:"0.0.0.0",//默认localhost 只能本地访问，若希望局域网可以访问，作为一个服务，配置为0.0.0
    contentBase: path.join(__dirname,"dist"),
    proxy: {
      "/doctorapi": {
        target: "https://doctor.5aszy.com",
        changeOrigin: true,
        pathRewrite: {
          "^/doctorapi": ""
        }
      },
      "/patientapi": {
        target: "https://patient.5aszy.com",
        changeOrigin: true,
        pathRewrite: {
          "^/patientapi": ""
        }
      }
    },
    watchOptions:{
      poll:true
    }
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // new CleanWebpackPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './static'),
      to: path.resolve(__dirname, "./dist"),
      ignore: ['.*']
    }])
  ]
};
