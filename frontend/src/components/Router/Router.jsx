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
import Upload from "../sections/dashboardsection/Upload";
import { Navigate } from "react-router-dom";

const BlockRoutefromLoggedinUser=({children})=>{
  const {isAuth} = useAuth();
  if(isAuth) return <Navigate to="/dashboard" replace />
  return children;
}
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "", element: <Home />},
            {path: "apidocs", element: <ApiDocPage />},
            {path:"auth",element: <BlockRoutefromLoggedinUser><AuthPage /></BlockRoutefromLoggedinUser>},
            {path:"dashboard",element:  
            <ProtectedRoute><DashboardPage /></ProtectedRoute>,
            children: [
                {path:"upload", element:<Upload/>},
                {path:"tryout", element:<TryoutSection/>}
            ]}

           
        ]
    }
])

