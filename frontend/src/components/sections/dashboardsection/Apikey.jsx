import React, { useState, useEffect } from "react";

function Apikey() {
  const [apikeys, setApikeys] = useState([]);
  const [newkey, setnewkey] = useState({});
  const [modal, setmodal] = useState(false);
  const fetchkeys = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/v1/apikey/list`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await res.json();
      setApikeys(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchkeys();
  }, []);

  const handlekey = async () => {
    const name = window.prompt("Enter key name", "default");
    if (!name) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/v1/apikey/create`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ name }),
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await res.json();
      if (res.ok) {
        setnewkey({ name: data.data.apiKey.name, key: data.data.key });
        setmodal(true);
        fetchkeys();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlekeydel = async (id) => {
    const confirmDelete = window.confirm("Delete this API key?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/v1/apikey/revoke/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (res.ok) {
        setApikeys((prev) => prev.filter((k) => k._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeKeys = apikeys.filter((k) => !k.revoked);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-mono px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {modal && (
        <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-30">
          <div className="m-1 bg-zinc-900 border border-zinc-700 rounded-lg p-6 min-w-0 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-zinc-100">
              New API Key Created
            </h2>
            <p className="text-sm text-zinc-400 mb-2">Name: {newkey.name}</p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-lg font-semibold text-zinc-100 mb-4">
                API Key Created
              </h2>

              {/* Key Box */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 flex items-center justify-between gap-3">
                <p className="text-sm text-zinc-300 font-mono truncate">
                  {newkey.key}
                </p>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(newkey.key);
                  }}
                  className="active:scale-95 px-3 py-1.5 text-xs font-medium rounded-md bg-green-500/90 hover:bg-green-500 text-white transition"
                >
                  Copy
                </button>
              </div>

              
              <p className="text-xs text-red-400 mt-3">
                This is the only time you’ll see this key. Store it securely.
              </p>

              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setmodal(false);
                    setnewkey({});
                  }}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-zinc-100 text-black hover:bg-zinc-200 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 sm:px-6 py-1">
       
        <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3 className=" text-sm text-zinc-400 font-mono tracking-tight">
              ☰ API Keys
            </h3>
            <p className="text-sm text-zinc-500 mt-1 px-2">
              Manage and revoke your access keys
            </p>
          </div>

          <button
            onClick={handlekey}
            className="w-full sm:w-auto px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-zinc-200 transition"
          >
            + Create Key
          </button>
        </div>

        
        <div className="max-w-5xl mx-auto">
          {activeKeys.length === 0 ? (
            <div className="border border-dashed border-zinc-800 rounded-lg p-8 sm:p-10 text-center text-zinc-500">
              No API keys yet. Create one to get started.
            </div>
          ) : (
            <div className="border border-zinc-800 rounded-lg overflow-x-auto divide-y divide-zinc-800">
              {activeKeys.map((k) => (
                <div
                  key={k._id}
                  className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 hover:bg-zinc-900 transition"
                >
                  {/* Left */}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium break-all">
                      {k.name}
                    </span>
                    <span className="text-xs text-zinc-500 mt-1">
                      {k.prefix}••••
                    </span>
                    <span className="text-zinc-500 text-sm mr-10">
                        Last used: {k.lastUsedAt?new Date(k.lastUsedAt).toLocaleString():"Never"}
                    </span>
                  </div>

                  {/* Right */}
                  <div className="flex items-center justify-between text-sm sm:justify-end gap-4">
                    
                    <span className="text-zinc-500 mr-10">
                        Created: {new Date(k.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-green-400">Active</span>

                    
                    <button
                      onClick={() => handlekeydel(k._id)}
                      className="text-xs text-red-400 hover:text-red-300 transition"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Apikey;
