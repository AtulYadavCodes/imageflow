// Sidebar.jsx
import { NavLink } from "react-router-dom";

const Routes=[
  { path:"", label:"Files & Folders" 
  },
  { path:"apikey", label:"API Keys"
  },
  { path:"profile", label:"User Profile"
  }
]
function Sidebar() {
  return (
    <aside className="flex h-[80vh] w-64 flex-col border-r border-zinc-700 bg-zinc-950 p-4">
      
      {/* Header */}
     

      {/* Top Nav */}
      <div className="space-y-2">
        {Routes.slice(0, 2).map((route) => {
          const path = route.path ? `/dashboard/${route.path}` : "/dashboard";

          return (
            <NavLink
              key={route.path}
              to={path}
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom */}
      <div className="space-y-3">
        {Routes.slice(2).map((route) => {
          const path = `/dashboard/${route.path}`;

          return (
            <NavLink
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
  );
}

export default Sidebar;