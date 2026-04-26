import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/HomePage";
import ApiDocPage from "../pages/ApiDocPage";

import React from 'react'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "", element: <Home />},
            {path: "apidocs", element: <ApiDocPage />}
           
        ]
    }
])