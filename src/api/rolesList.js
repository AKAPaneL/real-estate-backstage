// 导入axios
import request from '../utils/request'

// 获取角色列表接口
export function getRoles(params) {
  return request.get('/roles', {
    params
  })
}

// 删除角色
export function deleteRoles(id) {
  return request.delete(`/roles/${id}`)
}
