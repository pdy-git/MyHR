// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store/index'
import { Message } from 'element-ui'
import { getTimeOut } from '@/utils/auth'
import router from '@/router'
const timeout = 3600 // 定义超时时间

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间
  var timeStamp = getTimeOut()
  return (currentTime - timeStamp) / 1000 > timeout
}
const service = axios.create({
  baseURL: '/api', // 两选一
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 设置超时时间
}) // 创建一个axios的实例

// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    // 检查是否超时
    if (IsCheckTimeOut()) {
      // 删除token 然后跳转页面
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    // 如果存在就返回token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
    // console.log(config)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message) // 提示错误信息
    return Promise.reject(new Error(message))
  }
}, (error) => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 删除token 然后跳转页面
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error) // 返回执行错误 让当前的执行跳出成功 ，直接竟然catch
})
export default service // 导出axios实例
