// Sidebar.jsx
import { NavLink } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
const Routes=[
  { path:"", label:"Files & Folders" 
  },
  { path:"apikey", label:"API Keys"
  },
  { path:"profile", label:"User Profile"
  }
]
function Sidebar() {



  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <button
      className="sm:hidden fixed top-21 min-w-10 h-5 left-4 z-30  rounded-md  text-zinc-300 "
      onClick={() => setIsOpen(!isOpen)}
    >

    </button>
    <aside className={`${isOpen?"flex fixed z-40":"hidden"}  sm:flex h-[80vh] w-64 flex-col border-r border-zinc-700 bg-zinc-950 p-4`}>
 
     

    
      <div className="space-y-2">
        {Routes.slice(0, 2).map((route) => {
          const path = route.path ? `/dashboard/${route.path}` : "/dashboard";

          return (
            <NavLink
              key={route.path}
              to={path}
              onClick={()=>setIsOpen(!isOpen)}
              end={route.path === ""} // important for "/dashboard"
              className={({ isActive }) =>
                `w-full block text-left font-mono text-sm px-4 py-2 border transition ${
                  isActive
                    ? "bg-zinc-100 text-zinc-900 border-zinc-500"
                    : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800"
                }`
              }
            >
              {route.label}
            </NavLink>
          );
        })}
      </div>

      {/* Spa */}
      <div className="flex-1" />

      {/* Bottom */}
      <div className="space-y-3">
        {Routes.slice(2).map((route) => {
          const path = `/dashboard/${route.path}`;

          return (
            <NavLink
             onClick={()=>setIsOpen(!isOpen)}
              key={route.path}
              to={path}
              className={({ isActive }) =>
                `w-full block text-left font-mono text-sm px-4 py-2 border transition ${
                  isActive
                    ? "bg-zinc-100 text-zinc-900 border-zinc-500"
                    : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800"
                }`
              }
            >
              {route.label}
            </NavLink>
          );
        })}
      </div>
    </aside>
    </>
  );
}

export default Sidebar;