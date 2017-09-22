var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

//webpack 最基本的配置
//路径拼接
function resolve(dir) {
  //把三个参数连起来,返回一个地址,__dirname当前文件的绝对路径, '..'上一级名录
  return path.join(__dirname, '..', dir)
}

//webpack配置对象
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    //设置请求的静态文件的路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //resolve: 在使用import和require的一些配置相关
  resolve: {
    //在引入文件的时候不需要写这些文件的后缀名, 会自动补全
    extensions: ['.js', '.vue', '.json'],
    //设置别名,每一个key值对应一个地址, 再去引入某个页面下的地址的时候, 就可以使用这个别名的Key值
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  //module:如何处理项目中不同类型的模块: 每个文件都是一个模块, 所以说来决定你如何处理这些文件,
  //       在webpack里面, 是通过各种loader来对文件进行编译的, webpack会去扫描目录,根据后缀名匹配到的文件
  //       把文件的内容做为输入,对应的loader就会去处理文件, 最后输出一些新的文件内容
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,  //正则, 告诉webpack遇到哪些文件的时候
        loader: 'eslint-loader',  //加载相应的loader
        enforce: 'pre', //pre 在编译之前需要做的事情, 这里是在编译之前需要对代码进行检查
        include: [resolve('src'), resolve('test')],   //指定loader处理的目录
        options: { //loader的参数
          //就是说在eslint进行处理的时候, 会使用该模块进行处理,提供eslint的一些错误信息, 也可以有官网进行查看
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig  //依赖该配置的输出,作用就是把vue中的stylecss抽离出来,要么就打包在js里,要么就生成一个css文件
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')] //指定转化的目录
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {//处理图片相关的loader参数
          limit: 10000,   //如果图片小于10KB, 那么就直接生成BASE64格式的代码放在js里
          name: utils.assetsPath('img/[name].[hash:7].[ext]') //如果大于则生成文件, 放在这个目录下
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
