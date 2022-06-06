import { getToken } from '@/utils'
// import React from 'react'
import { Navigate } from 'react-router-dom'
/* 
高阶组件：HOC
把一个组件作为参数传入这个组件，经过一定的处理返回一个新的组件
*/

export default function AuthRoute({ children }) {
    return getToken() ? <>{children}</> : <Navigate to='/login' replace />
}

