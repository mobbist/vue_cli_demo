import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

// 1
Vue.use(Router)

// 配置路由
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
