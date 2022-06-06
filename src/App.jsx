import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import routes from '@/router'


function App() {
  const [count, setCount] = useState(0)

  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        {/* 创建路由 */}
        <Routes>
          {
            routes.map((route) => <Route key={route.path} path={route.path} element={route.component} />
            )
          }

        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
