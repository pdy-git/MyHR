import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as directives from '@/directives'
import * as filters from '@/filters'

import '@/icons' // icon
import '@/permission' // permission control

import Components from '@/components'
Vue.use(Components) // 全局组件的自定义注册

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

// 注册自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

// 注册全局的过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
