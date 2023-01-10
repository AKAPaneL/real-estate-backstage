import request from '@/utils/request'

// 封装获取分类列表
export function getCategory(params) {
  return request.get('/categories', { params })
}

// 封装获取分类数量
export function getCategoryCount() {
  return request.get('/categories/count')
}
