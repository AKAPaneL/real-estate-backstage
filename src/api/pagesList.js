import request from '@/utils/request'

// 获取页面列表
export function getPageList(params) {
  return request.get('/pages', { params })
}

// 获取页面数量
export function getPageListCount(data) {
  if (data) {
    return request.get(`/pages/count?title_contains=${data}`)
  }
  return request.get(`/pages/count`)
}

// 新建页面
export function addPageList(data) {
  return request.post('/pages', data)
}

// 根据id获取详细
export function checkPageList(id) {
  return request.get(`/pages/${id}`)
}

// 更新分类数据
export function changePageList(data) {
  return request.put(`/pages/${data.id}`, data)
}
