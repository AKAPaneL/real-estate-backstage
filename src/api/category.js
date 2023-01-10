import request from '@/utils/request'

// 封装获取分类列表
export function getCategory(data) {
  return request.get('/categories', { data })
}
