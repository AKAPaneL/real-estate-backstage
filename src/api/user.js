import request from '@/utils/request'

// 用户注册接口
export function register(data) {
  return request.post('/auth/local/register', data)
}

// 导出用户登录接口
export function login(data) {
  return request.post('/auth/local', data)
}

// 封装用户登出接口
export function logout() {

}

// 获取用户信息接口
export function getUser() {
  return request.get('/users/me')
}

// 编辑用户
export function editUser(data) {
  return request.put(`/users/${data.id}`, data)
}

