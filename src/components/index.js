// 负责所有全局自定义组件的注册
import PageTools from './PageTools'

export default {
  // 组件的注册
  install(Vue) {
    Vue.component('PageTools', PageTools)
  }
}
