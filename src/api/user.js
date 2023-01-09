import request from '@/utils/request'

// 用户注册接口
export function register(data) {
  request.post('/auth/local/register', data)
}

// 导出用户登录接口
export function login(data) {
  request.post('/auth/local', data)
}

