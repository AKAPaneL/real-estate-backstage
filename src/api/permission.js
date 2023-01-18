import request from '@/utils/request'

// 导出 获取当前登录用户的权限列表
export function getUserPermission() {
  return request.get('/mypermissions')
}

// 获取所有权限列表
export function getAllPermissionList() {
  return request.get('/permissions?_limit=99999&_start=0')
}

// 根据id获取单个权限
export function getSinglePermission(id) {
  return request.get(`/permissions/${id}`)
}
// 根据id删除权限
export function deletePermission(id) {
  return request.delete(`/permissions/${id}`)
}

// 新增权限
export function addPermission(data) {
  return request.post('/permissions', data)
}

// 编辑权限
export function editPermission(data) {
  return request.put(`/permissions/${data.id}`, data)
}

