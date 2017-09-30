var utils = require('./utils') //工具文件
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')// webpack基本配置, 都适用于开发和生产
var HtmlWebpackPlugin = require('html-webpack-plugin')  //webpack插件,根据模板生成html文件,
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  //错误提示插件,清除webpack在打包过程的一些提示,使开发体验更好

// add hot-reload related code to entry chunks
//关于入口文件和热加载相关的: 拿到基本配置里的entry,对其进行Key值的循环
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  //在循环的过程中, 会将入口文件,凭借成这样的形式  ['./build/dev-client', './src/main.js'],
  //然后在编译的时候会变成这样: app:[ 'webpack-hot-middleware/client?noInfo=true&reload=true','./src/main.js']
  //这是用来做热更新的, 用这个来监控main.js 如果有改动, 就立马做热更新
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

//对基本配置的补充
module.exports = merge(baseWebpackConfig, {
  module: {
    //对工具函数styleLoaders传参, 设置sourceMap为false
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // 对sourceMap的一种类型的设置
  devtool: '#cheap-module-eval-source-map',
  
  plugins: [
    //对webpack做设置, 设置为开发环境
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    //开启热更新
    new webpack.HotModuleReplacementPlugin(),
    //如果编译出错, 则会跳过这段代码,使编译后的文件不会发生错误,但是在编译之后会报错
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //生成HTML文件
    new HtmlWebpackPlugin({
      //生成的文件名
      filename: 'index.html',
      //以哪个文件为模板进行生成
      template: 'index.html',
      //在生成之后, 把打包后的JS文件插入到html中
      inject: true
    }),
    //友好的错误提示插件
    new FriendlyErrorsPlugin()
  ]
})
