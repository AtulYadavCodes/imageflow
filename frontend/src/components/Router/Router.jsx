import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/HomePage";
import ApiDocPage from "../pages/ApiDocPage";

import AuthPage from "../pages/AuthPage";




import DashboardPage from "../pages/DashboardPage";

import React from 'react'
import ProtectedRoute from "./ProtectedRoute";



import { useAuth } from "../../Context/LoginContext";

import TryoutSection from "../sections/TryoutSection";
import Filesandfolder from "../sections/dashboardsection/Filesandfolder";
import Apikey from "../sections/dashboardsection/Apikey";
import UserProfile from "../sections/dashboardsection/UserProfile";
import { Navigate } from "react-router-dom";

import Files from "../sections/dashboardsection/Files";
const BlockRoutefromLoggedinUser = ({ children }) => {
    const { isAuth } = useAuth();
    if (isAuth) return <Navigate to="/dashboard" replace />
    return children;
}
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Home /> },
            { path: "apidocs", element: <ApiDocPage /> },
            { path: "auth", element: <BlockRoutefromLoggedinUser><AuthPage /></BlockRoutefromLoggedinUser> },
            {
                path: "dashboard", element:
                    <ProtectedRoute><DashboardPage /></ProtectedRoute>,
                children: [
                    { path: "", element: <Filesandfolder /> },
                    { path: "apikey", element: <Apikey /> },
                    { path: "profile", element: <UserProfile /> },
                    {path:"files/:foldername", element:<Files/>}
                ]
            }


        ]
    }
])

