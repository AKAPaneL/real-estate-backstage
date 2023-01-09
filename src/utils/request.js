import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/index'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // 获取vuex里面的token
  const token = store.getters.token
  if (token) {
    // 如果有token 我们要封装到接口
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, function(error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  const { statusCode } = error.response.data
  if (statusCode === 400) {
    const { message: [{ messages: [{ message }] }] } = error.response.data
    // 提示错误信息
    if (message) {
      Message.error(message)
    }
  } else if (statusCode === 401) {
    Message.error(error.response.data.message)
  }
  return Promise.reject(error)
})

export default service
