// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store/index'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: '/api', // 两选一
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例

// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
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
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误 让当前的执行跳出成功 ，直接竟然catch
})
export default service // 导出axios实例
