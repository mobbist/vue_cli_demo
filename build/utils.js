var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin') //weppack的插件, 用于抽取css文件, 在打包的时候生成单独的css文件

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  //兼容各个平台,把你的地址和路径拼接起来
  return path.posix.join(assetsSubDirectory, _path)
}


exports.cssLoaders = function (options) {
  options = options || {}
  //cssloader的配置
  var cssLoader = {
    //处理css的loader
    loader: 'css-loader',
    options: {
      //是否压缩
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    //声明一个数组, 并把上面的cassloader加进来
    var loaders = [cssLoader]
    //然后如果传了参数进来,那么说明要使用预处理器了
    if (loader) {
      //然后加入一个预处理器的loader
      loaders.push({
        //比如你用了sass, 那么就要加载sass-loader, 处理sass的文件
        loader: loader + '-loader',
        //合并对象
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    //如果参数里有提取文件的, 也就是希望把css提取出来的
    if (options.extract) {
      //那么就会执行插件下面的这个方法
      return ExtractTextPlugin.extract({
        //使用的就是上面加入的这些loader
        use: loaders,
        //在处理完之后,会在html模板中去动态的生成style标签, 把css生成进去
        fallback: 'vue-style-loader'
      })
    } else {
      //如果你不提取文件,那就生成loader的合集,'css-loader!style-loader'等等
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  //返回各种css和css的预处理器, 每个都会调用generateLoaders函数, 并传参
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
