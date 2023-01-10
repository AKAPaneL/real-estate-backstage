// 这里封装客户管理相关接口
import request from '@/utils/request'

// 获取客户列表
// { _limit, _start, name_contains, agent }  四个参数 后两个不传才会得到所有的列表
export function getClientsList() {
  return request.get(`/clients?_limit=2&_start=0`)
}

// 获取客户数量
export function getClientsCount() {
  return request.get('/clients/count')
}
