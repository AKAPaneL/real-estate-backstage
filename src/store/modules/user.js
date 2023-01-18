import { login, getUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUserPermission } from '@/api/permission'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    userInfo: '',
    token: getToken(),
    permission: ''
  },
  mutations: {
    setUser(state, user) {
      state.userInfo = user
    },
    removeUser(state) {
      state.userInfo = ''
      state.permission = ''
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    },
    setPermission(state, permission) {
      state.permission = permission
    }
  },
  actions: {
    // 登录方法  保存token 以及
    async login({ commit }, data) {
      const { jwt, user } = await login(data)
      commit('setToken', jwt)
      Message.success(`欢迎！${user.username}`)
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
      // 获取用户权限
      const per = await getUserPermission()
      commit('setPermission', per)
    }
  }
}

