// 导入axios
import request from '../utils/request'

// 获取角色列表接口
export function getRoles(params) {
  return request.get('/roles', {
    params
  })
}

// 获取角色数量
export function getRolesCount() {
  return request.get('/roles/count')
}

// 获取指定角色
export function getRolesId(id) {
  return request.get(`/roles/${id}`)
}

// 创建角色
export function createRoles(data) {
  return request.post('/roles', data)
}

// 编辑角色
export function getEditRoles(role) {
  return request.put(`/roles/${role.id}`, role)
}

// 删除角色
export function deleteRoles(id) {
  return request.delete(`/roles/${id}`)
}
