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
