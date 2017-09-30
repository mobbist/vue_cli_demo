// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 入口JS
// vue核心库
import Vue from 'vue'
// 入口组件
import App from './App'
// vue路由, 返回是一个函数
import router from './router'

Vue.config.productionTip = false;

var fun = test => {
	console.log(1);
}
console.log(fun);
/* eslint-disable no-new */
new Vue({
	// vue挂载点
	el: '#app',
	// 当前路由
	router,
	// 引入组件,在引入之前需要注册组件
	template: '<App/>',
	// 注册组件
	components: { App }
})
