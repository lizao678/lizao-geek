// 把所有模块统一处理
// 导出一个统一的方法 useStore
import React from "react";
import LoginStore from "./login.Store";
class RootStore {
    constructor() {
        this.LoginStore = new LoginStore()
        // ...
    }
}

// 实例化根
// 导出useStore
const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }