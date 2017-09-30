// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  // 复制以上链接,可以看到他对代码的风格进行制定了一定的规则
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  //添加自定义的规则
  'rules': {
    // allow paren-less arrow functions
    //代表箭头函数不需要写括号, 0代表忽略检查 1警告    2出错
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    //开发环境允许debugger, 生产环境不允许debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //自定义规则: 忽略检查尾部;是否添加
    'semi': 0,
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    "indent": 0,
    "no-tabs": 0
  }
}
