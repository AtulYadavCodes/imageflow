import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/HomePage";
import ApiDocPage from "../pages/ApiDocPage";

import AuthPage from "../pages/AuthPage";




import DashboardPage from "../pages/DashboardPage";

import React from 'react'
import ProtectedRoute from "./ProtectedRoute";



import { useAuth } from "../../Context/LoginContext";
const blockroutefromloggedinuser=({children})=>{
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
            {path:"auth",element: <blockroutefromloggedinuser><AuthPage /></blockroutefromloggedinuser>},
            {path:"dashboard",element:  
            <ProtectedRoute><DashboardPage /></ProtectedRoute>},

           
        ]
    }
])

