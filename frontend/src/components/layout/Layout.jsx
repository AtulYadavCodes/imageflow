import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import React from 'react'
import FooterSection from "../ui/Footer";

function Layout() {
  return (
    <>
     <div className="min-h-screen flex flex-col">

      <Navbar />


      <main className="flex-1">
        <Outlet />
      </main>


      <FooterSection />
    </div>
    </>
  )
}

export default Layout