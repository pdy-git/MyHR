
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUesrInfo, getUserDetailById } from '@/api/user'

const state = {
  token: getToken(),
  uesrInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUesrInfo(state, result) {
    state.uesrInfo = result
  },
  removeUesrInfo(state) {
    state.uesrInfo = {}
  }
}
const actions = {
  async login(context, data) {
    try {
      const res = await login(data) // 拿token
      context.commit('setToken', res) // 设置token
    } catch (error) {
      console.log(error)
    }
  },
  async getUesrInfo(context) {
    const res = await getUesrInfo()
    const baseInfo = await getUserDetailById(res.userId)
    const baseResult = { ...res, ...baseInfo }
    context.commit('setUesrInfo', baseResult)
    return res // 这里为什么要返回 为后面埋下伏笔
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
