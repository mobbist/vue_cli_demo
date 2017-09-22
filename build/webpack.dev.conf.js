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
  //在循环的过程中, 会将入口文件,凭借成这样的形式  './build/dev-client'
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

//对基本配置的补充
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
