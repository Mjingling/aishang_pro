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
    host:"0.0.0.0",//默认localhost 只能本地访问，若希望局域网可以访问，作为一个服务，配置为0.0.0.0
    port:8000,//服务启动的端口号
    hot: true,//启动热更新
    watchContentBase: true,
    publicPath: "/",
    contentBase: path.join(__dirname,"dist"),//必须是绝对路径 服务启动的目录
    open: true,//启动后自动打开浏览器
    // overlay: true,
    compress: true,//启用压缩
    progress: true,//打包时显示打包进程
    //设置代理
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
