// 导入axios
import request from '@/utils/request'

// 获取用户列表
export function getUsersList(params) {
  return request.get('/users', {
    params
  })
}
