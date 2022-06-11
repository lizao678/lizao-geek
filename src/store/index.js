// 把所有模块统一处理
// 导出一个统一的方法 useStore
import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./user.Store";
import ChannelStore from "./channel.Store";
import CompileStore from "./compile.Store";
class RootStore {
    constructor() {
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.channelStore = new ChannelStore()
        this.compileStore = new CompileStore()
        // ...
    }
}

// 实例化根
// 导出useStore
const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }