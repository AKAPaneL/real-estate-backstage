import { login, getUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    userInfo: {},
    token: getToken()
  },
  mutations: {
    setUser(state, user) {
      state.userInfo = user
    },
    removeUser(state) {
      state.userInfo = {}
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    }
  },
  actions: {
    // 登录方法  保存token 以及
    async login({ commit }, data) {
      const { jwt, user } = await login(data)
      commit('setToken', jwt)
      commit('setUser', user)
    },
    // 登出接口
    logout({ commit }) {
      // 删除token
      commit('removeToken')
      // 删除用户信息
      commit('removeUser')
      // 重置路由
      resetRouter()
    },
    // 获取用户信息接口
    async getUser({ commit }) {
      const res = await getUser()
      commit('setUser', res)
    }
  }
}

