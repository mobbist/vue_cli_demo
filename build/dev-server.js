require('./check-versions')()  //引入该文件, 这文件的主要作用是检测node和npm的一些版本

var config = require('../config') //config导入在构建和在开发的时候一些配置项

//判断是有有全局变量NODE_ENV,这里是定义是开发环境还是生产环境
if (!process.env.NODE_ENV) {
  //如果没有,就会去这个config里面拿,得到的是开发环境"development"
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')//自动打开浏览器,打开指定的url地址
var path = require('path')
var express = require('express')
var webpack = require('webpack')//把webpack作为模块使用
var proxyMiddleware = require('http-proxy-middleware') //http协议代理的中间件,可以转发请求到其他服务里
var webpackConfig = require('./webpack.dev.conf') //在开发环境里webpack的配置

// default port where dev server listens for incoming traffic
//端口号, 先从环境变量里取, 如果没有的话就从开发配置中取
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
// 设置在启动应用的时候是否自动打开浏览器 
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 获取需要代理的http协议信息, 做跨域的时候设置一下目标服务的信息, 这时候就可以跨域拿到数据了
var proxyTable = config.dev.proxyTable
//开启web服务
var app = express()

//执行webpack并将参数传递并返回
var compiler = webpack(webpackConfig)

//根据webpack的配置打包生成的文件,存在内存中, 也就是说我们访问的是存在于内存中的文件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  //访问静态目录的文件
  publicPath: webpackConfig.output.publicPath,
  //控制台输出任何东西
  quiet: true
})

//做热加载, 在改变内容的时候也是在内存中生成,这时候需要更新视图,则需要热加载, 就是这个作用
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// 对模板html进行改动的时候,也有热更新的过程
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// 获取代理信息
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  //传入到该方法中, 就可以做代理了
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 将路由设置为history的时候,请求某个路由的时候, 可能会请求不到,使用这个模块来解决这个问题
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 使用该中间件
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
//设置资源访问的路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

//设置URL
var uri = 'http://localhost:' + port

var _resolve
//这边使用了promise, 然后把返回值传位一个变量
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})
//开启服务的提示
console.log('> Starting dev server...')

//把打包后的文件放在内存中
devMiddleware.waitUntilValid(() => {
  //所有都打包成功后,进行提示
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    //打开浏览器
    opn(uri)
  }
  //
  _resolve()
})
//监听端口
var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
