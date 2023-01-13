import request from '@/utils/request'

// 封装获取分类列表
export function getCategory(params) {
  return request.get('/categories', { params })
}
// 封装获取分类数量
export function getCategoryCount(data) {
  if (data) {
    return request.get(`/categories/count?title_contains=${data}`)
  }
  return request.get(`/categories/count`)
}

// 封装新建分类
export function addCategory(data) {
  return request.post('/categories', data)
}

// 封装根据id查看分类
export function checkCategory(id) {
  return request.get(`/categories/${id}`)
}

// 更新分类数据
export function changeCategory(data) {
  return request.put(`/categories/${data.id}`, data)
}

// 删除分类
export function delCategory(id) {
  return request.delete(`/categories/${id}`)
}
