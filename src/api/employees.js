// 导入axios
import request from '@/utils/request'

// 获取用户列表
export function getUsersList(params) {
  return request.get('/users', {
    params
  })
}

// 新建用户
export function createUsers(data) {
  return request.post('/auth/local/register', data)
}

// 删除用户
export function getDelList(id) {
  return request.delete(`/users/${id}`)
}
