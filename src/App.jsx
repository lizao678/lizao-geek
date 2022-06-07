import { useState } from 'react'
import { unstable_HistoryRouter as HistoryRouter, Routes } from 'react-router-dom'
import './App.css'
import router from '@/router'
import { history } from '@/utils/history'


function App() {
  // const [count, setCount] = useState(0)
  return (
    // 路由配置
    <HistoryRouter history={history}>
      {/* <BrowserRouter> */}
      <div className="App">
        {/* 创建路由 */}
        <Routes>
          {router}
        </Routes>
      </div>
      {/* </BrowserRouter> */}
    </HistoryRouter>

  )
}

export default App
