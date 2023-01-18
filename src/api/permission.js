import request from '@/utils/request'

// 导出 获取当前登录用户的权限列表
export function getUserPermission() {
  return request.get('/mypermissions')
}

// 获取所有权限列表
export function getAllPermissionList() {
  return request.get('/permissions?_limit=99999&_start=0')
}

