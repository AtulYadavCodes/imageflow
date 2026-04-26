import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import React from 'react'
import FooterSection from "../ui/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <FooterSection />
    </>
  )
}

export default Layout