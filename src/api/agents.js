// 这里封装 经济 相关的接口
import request from '@/utils/request'

// 获取所有经济列表------提供给 客户管理 模块使用 五栋
export function getAllAgentsList() {
  return request.get(`/agents`)
}
