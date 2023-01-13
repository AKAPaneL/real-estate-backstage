import request from '@/utils/request'

// 封装房产管理相关接口
// { _limit, _start, name_contains, agent }  四个参数 后两个不传才会得到所有的列表
export function getPropertiesList(params) {
  return request.get(`/properties`, { params })
}

// 获取房产数量
export function getPropertiesCount(params) {
  if (params) {
    return request.get(`/properties/count`, { params })
  }
  return request.get(`/properties/count`)
}

// 指定房产
export function getProperties(id) {
  return request.get(`/properties/${id}`)
}

// 删除房产信息
export function deleteProperties(id) {
  return request.delete(`/properties/${id}`)
}

// 添加房产接口
export function addProperties(data) {
  return request.put(`/properties`, data)
}

// 编辑房产
export function editorProperties(data) {
  return request.put(`/properties/${data.id}`, data)
}
