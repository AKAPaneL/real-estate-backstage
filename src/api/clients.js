// 这里封装客户管理相关接口
import request from '@/utils/request'

// 获取客户列表
// { _limit, _start, name_contains, agent }  四个参数 后两个不传才会得到所有的列表
export function getClientsList(params) {
  return request.get(`/clients`, { params })
}

// 获取客户数量
// {name_contains,agent}  两个参数   不传得到所有数量
export function getClientsCount(params) {
  if (params) {
    return request.get('/clients/count', { params })
  }
  return request.get('/clients/count')
}
// 获取指定客户
export function getSingleClient(id) {
  return request.get(`/clients/${id}`)
}
// 删除客户信息
export function deleteClient(id) {
  return request.delete(`/clients/${id}`)
}

// 添加 客户 接口
export function addClient(data) {
  return request.post('/clients', data)
}

// 编辑接口
export function editorClient(data) {
  return request.put(`/clients/${data.id}`, data)
}
