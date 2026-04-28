import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import React from 'react'
import FooterSection from "../ui/Footer";

function Layout() {
  return (
    <>
     <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content grows to push footer down */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer stays at bottom naturally */}
      <FooterSection />
    </div>
    </>
  )
}

export default Layout