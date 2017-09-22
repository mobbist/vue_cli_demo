# vue_cli_demo

> 分析vue_cli

## 目录结构作用
build:          webpack配置相关, 这里的文件代码, 在内部说明
config:         生产环境和开发环境的配置参数
node_modules:   安装的第三方依赖
src:            项目源码, webpack会对该目录下代码做特殊处理
static:         放第三方资源, gitkeep, 创建空白文件夹的时候是无法提交至git的, 如果有gitkeep则可以提交上空文件夹

.babelrc        babel配置文件,当babel启动的时候,会找该文件,读取这里的配置 es6转为es5,将一些草案阶段的语法也转为ES5使用
.editconfig     编辑器使用的一些配置
.eslintignore   代码风格检查时候的所需要忽略的文件
.eslintrc       在安装cli的时候选择需要帮我们做代码风格的检查
.gitignore      提交的代码所要忽略的文件
.postcssrc      预先设置css规则
index.html      项目入口模板
package.json    一些项目描述, npm脚本命令, 第三方包目录等

## vue_cli  webpack
> vue_cli 对webpack的一些配置

键入脚本命令 npm run dev:
实际上是访问的package.json下的脚本命令: "dev": "node build/dev-server.js". 就是使用node命令 执行 build文件夹下的dev.server.js. 点进去细看