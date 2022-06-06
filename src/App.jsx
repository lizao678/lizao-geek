import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import router from '@/router'


function App() {
  // const [count, setCount] = useState(0)
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        {/* 创建路由 */}
        <Routes>
          {router}
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
