// 封装axios
// 实例化 请求拦截器 响应拦截器
// import { message } from "antd";
import axios from "axios";
import { getToken } from "./token";
import { history } from "./history";

const http = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})
// let hide
// 添加请求拦截器
http.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // console.log(`当前请求为${config.url} ,data`, config)
    // hide = message.loading('加载中...', 0)
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
    // 2xx范围内的状态码都会触发该函数
    // 对响应数据做点什么

    response.data.headers = response.headers
    // console.log(`这是响应data${response.config.url}`, response.data, `response`, response);
    // hide()
    return response.data
}, (error) => {
    // 超过 2xx 范围的状态码都会触发该函数
    // 对响应错误做点什么
    // hide()
    // console.dir(error);

    if (error.response.status === 401) {
        // 跳回登录页
        history.push('/login')
    }
    return Promise.reject(error)
})

export { http }