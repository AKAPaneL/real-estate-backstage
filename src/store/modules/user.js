import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    user: {},
    token: getToken()
  },
  mutations: {
    setUser(state, user) {
      state.user = user
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
    }
  }
}

