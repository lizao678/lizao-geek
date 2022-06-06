import { http } from "@/utils"
import { makeAutoObservable } from "mobx"


class UserStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
    }
    getUseInfo = async () => {
        // 调用接口获取数据
        const res = await http.get('/user/profile')
        this.userInfo = res.data
        return res
    }

}

export default UserStore