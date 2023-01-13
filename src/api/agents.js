// 这里封装 经济 相关的接口
import request from '@/utils/request'

// 获取所有经济列表------提供给 客户管理 模块使用 五栋
export function getAllAgentsList() {
  return request.get(`/agents`)
}
// __________________________________

// 获取经纪人列表
export function getAgents(params) {
  return request.get('/agents', { params })
}

// 获取经理数量
export function getAgentsCount(data) {
  if (data) {
    return request.get(`/agents/count?name_contains=${data}`)
  }
  return request.get(`/agents/count`)
}

// 新建经纪
export function addAgents(data) {
  return request.post('/agents', data)
}

// 根据id查看指定经纪
export function checkAgents(id) {
  return request.get(`/agents/${id}`)
}

// 更新经济数据
export function changeAgents(data) {
  return request.put(`/agents/${data.id}`, data)
}

// 删除经纪
export function deleteAgents(id) {
  return request.delete(`/agents/${id}`)
}
