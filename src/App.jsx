import { unstable_HistoryRouter as HistoryRouter, Routes } from 'react-router-dom'
import './App.css'
import router from '@/router'
import { history } from '@/utils/history'
import { Suspense } from 'react'
import { Spin } from 'antd';



function App() {
  return (
    // 路由配置
    <HistoryRouter history={history}>
      {/* <BrowserRouter> */}
      <Suspense
        fallback={
          < div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}

          >
            <Spin tip="loading..." size="large" />
          </div >

        }
      >


        <div className="App">
          {/* 创建路由 */}
          <Routes>
            {router}
          </Routes>
        </div>
      </Suspense>
      {/* </BrowserRouter> */}
    </HistoryRouter >

  )
}

export default App
