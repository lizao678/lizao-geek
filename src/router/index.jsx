import AuthRoute from "@/conponents/AuthRoute";
import Article from "@/pages/Article";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Publish from "@/pages/Publish";
import { Navigate, Route } from "react-router-dom";

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
                element: <Article />
            },
            {
                path: 'publish',
                element: <Publish />
            },
        ]
    },

]

// 递归出路由结构
function routeRecursion(routes) {
    return routes.map((route) => (<Route key={route.path || route.name} {...route} >{route.children ? routeRecursion(route.children) : <></>}</Route>))
}

export default routeRecursion(routes)