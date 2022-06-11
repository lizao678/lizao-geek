import { makeAutoObservable } from "mobx"


class CompileStore {
    compileId = ''
    constructor() {
        makeAutoObservable(this)
    }
    getCompileId = () => {
        return this.compileId
    }
    setCompileId = (val) => {
        this.compileId = val
    }

}

export default CompileStore