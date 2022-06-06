// login module
import { makeAutoObservable } from "mobx"
import { http, setToken, getToken } from '@/utils'

class LoginStore {
    token = getToken() || ''
    constructor() {
        // 响应式
        makeAutoObservable(this)
    }
    SignIn = async ({ mobile, code }) => {
        // 调用登录接口
        const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
            mobile, code
        })
        // 存入token
        this.token = res.data.token
        // 存入localStore
        setToken(this.token)
        return res
    }
}

export default LoginStore