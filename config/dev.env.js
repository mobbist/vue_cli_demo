var merge = require('webpack-merge')//用于合并对象,把后面一个对象中的key合并到第一个对象中
var prodEnv = require('./prod.env') //导出一个对象{NODE_ENV: '"production"'}

//最终会合并成{NODE_ENV: '"development"'}并导出
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
