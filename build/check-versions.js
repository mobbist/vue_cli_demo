var chalk = require('chalk') //作用:用来定义输出终端的样式,要求红色, 或者绿色
var semver = require('semver') //处理版本号,比如2个版本号进行对比
var packageConfig = require('../package.json') //引入了本目录下的package.json
var shell = require('shelljs')  //作用: 执行一些终端的命令

function exec (cmd) {
  //引入一个系统模板,其中有一个execSync方法, 它可以执行参数命令.并得到结果
  return require('child_process').execSync(cmd).toString().trim()
}
//定义版本的要求
var versionRequirements = [
  {
    name: 'node',
    //process.version:获取node当前版本,通过semver函数拿出来
    currentVersion: semver.clean(process.version),
    //版本要求:运行该应用的时候, 是要求哪个版本: package.json的engines.node, 也就是大于等于4.0.0以上
    versionRequirement: packageConfig.engines.node
  }
]

//shell下的which函数:作用是在全局变量里搜索npm, 如果找到了以对象的形式返回
if (shell.which('npm')) {
  //找到NPM以后, 也加入到版本要求里面
  versionRequirements.push({
    name: 'npm',
    //执行上面这个exec函数:得到执行参数命令的结果并且返回. 这里就能拿到npm的版本
    currentVersion: exec('npm --version'),
     //版本要求:运行该应用的时候, 是要求哪个版本: package.json的engines.npm, 也就是大于等于3.0.0以上
    versionRequirement: packageConfig.engines.npm
  })
}

//导出一个函数
module.exports = function () {
  var warnings = []
  //循环版本要求的这个数组
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    //调用semver下的satisfies方法:作用是当前的版本是不是在你所要求的版本范围内
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      //如果不在范围内,在一个输出信息(新数组)内push一些警告信息
      warnings.push(mod.name + ': ' +
        //输出一些不同的样式, 有红色, 有绿色的
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  //如果检测到有输出信息了
  if (warnings.length) {
    console.log('')
    //向终端输入一些信息
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    //最终退出程序, 因为你的版本不满足要求的版本
    process.exit(1)
  }
}
