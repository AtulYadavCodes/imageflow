import { useState } from "react";

function Sidebar() {
  const [active, setActive] = useState("files");

  const topItems = [
    { id: "files", label: "Folders & Files" },
    { id: "apikey", label: "API Keys" },
  ];

  const bottomItem = { id: "profile", label: "User Profile" };

  return (
    <aside className="flex h-[80vh] w-64 flex-col border-r border-zinc-700 bg-zinc-950 p-4">
      {/* Header */}
      <div className="mb-6 border-b border-zinc-700 pb-3">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
          Dashboard
        </span>
      </div>

      {/* Top Nav */}
      <div className="space-y-2">
        {topItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full text-left font-mono text-sm px-4 py-2 border transition
              ${
                active === item.id
                  ? "bg-zinc-100 text-zinc-900 border-zinc-500"
                  : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Spacer pushes profile down */}
      <div className="flex-1" />

      {/* Bottom Section */}
      <div className="space-y-3">
        <button
          onClick={() => setActive(bottomItem.id)}
          className={`w-full text-left font-mono text-sm px-4 py-2 border transition
            ${
              active === bottomItem.id
                ? "bg-zinc-100 text-zinc-900 border-zinc-500"
                : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800"
            }`}
        >
          {bottomItem.label}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;