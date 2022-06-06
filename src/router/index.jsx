import AuthRoute from "@/conponents/AuthRoute";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import { Navigate } from "react-router-dom";

const routes = [
    {
        path: '/',
        component: <Navigate to='/login' replace />
    },
    {
        path: '/login',
        component: <Login />
    },
    {
        path: '/layout',
        component: <AuthRoute><Layout /></AuthRoute>
    },
]
export default routes