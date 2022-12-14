import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const TimeKey = 'hrsaas-timestamp-key' // 设置一个独一无二的key

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTimeOut() {
  return Cookies.get(TimeKey)
}

// 设置时间戳
export function setTimeOut() {
  return Cookies.set(TimeKey, Date.now())
}
