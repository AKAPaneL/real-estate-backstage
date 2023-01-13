// 封装房产管理相关接口
import request from '@/utils/request'

export function getPropertiesList(params) {
  return request.get(`/properties`, { params })
}
