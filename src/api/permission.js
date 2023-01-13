import request from '@/utils/request'

// 导出 获取当前登录用户的权限
export function getUserPermission() {
  return request.get('/mypermissions')
}

// 获取权限列表
export function getPermissionList() {
  return request.get('/permissions')
}
