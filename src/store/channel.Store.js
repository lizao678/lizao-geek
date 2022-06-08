import { http } from "@/utils"
import { makeAutoObservable } from "mobx"

class ChannelStore {
    channelList = []
    constructor() {
        makeAutoObservable(this)
    }
    // 有两个地方都用到了，应该在哪里调用这个函数
    loadChannelList = async () => {
        const res = await http.get('/channels')
        this.channelList = res.data.channels
    }
}
export default ChannelStore