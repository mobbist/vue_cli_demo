var utils = require('./utils')
var config = require('../config')
//process  node进程的相关信息
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  //loaders 说明是个数组,  调用工具函数下 cssLoaders:这个函数会返回处理css相关的loader和各种css预处理器 sass,less等,之后有机会练习一下
  loaders: utils.cssLoaders({

    //sourceMap:项目在最后会对文件进行压缩打包,如果在运行环境中出现错误, 会非常难以调试, 生成sourceMap更方便的调试代码
    //这边通过是否是生产环境来决定如何生成soureMap
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    //是否生成单独的CSS,根据生产还是开发环境
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
