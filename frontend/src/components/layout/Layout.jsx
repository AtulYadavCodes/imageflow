import {Outlet} from "react-router-dom";
import Navbar from "../ui/Navbar";
import React from 'react'

function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default Layout