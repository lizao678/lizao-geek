import AuthRoute from "@/conponents/AuthRoute";

import { Navigate, Route } from "react-router-dom";
// 路由懒加载
import { lazy } from "react";
const Login = lazy(() => import('@/pages/Login'))
const Article = lazy(() => import('@/pages/Article'))
const ArticleContent = lazy(() => import('@/pages/Article/components/ArticleContent'))
const Compile = lazy(() => import('@/pages/Article/components/Compile'))
const Home = lazy(() => import('@/pages/Home'))
const Layout = lazy(() => import('@/pages/Layout'))
const Publish = lazy(() => import('@/pages/Publish'))

const routes = [
    /* {
        path: '/',
        element: <Navigate to='/login' replace />
    }, */
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                // path: 'home',
                name: 'home',
                index: true,
                element: <Home />
            },
            {
                path: 'article',
                element: <Article />,
                children: [
                    {
                        name: 'content',
                        index: true,
                        element: <ArticleContent />
                    },
                    {
                        path: 'compile',
                        element: <Compile />
                    },
                ]
            },
            {
                path: 'publish',
                element: <Publish />
            },
        ]
    }
]

// 递归出路由结构
function routeRecursion(routes) {
    return routes.map((route) => (<Route key={route.path || route.name} {...route} >{route.children ? routeRecursion(route.children) : <></>}</Route>))
}

export default routeRecursion(routes)