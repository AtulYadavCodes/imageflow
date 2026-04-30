import React, { useEffect, useState } from "react";
import axios from "axios";
import { imageflowuploadfunction } from "../../../../imageflowsdk-browser/imageflowuploadfunction";

import { Link } from "react-router-dom";
function Filesandfolder() {
  const [folders, setFolders] = useState([]);
  

  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  
  const fetchFolders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/v1/folders/getalluserfolders`,
        { withCredentials: true }
      );
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setFolders(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  

  
  const handleCreateFolder = async () => {
    if (!file || !folderName) return;

    try {
      await imageflowuploadfunction(file, "", folderName);
      setShowCreate(false);
      setFile(null);
      setFolderName("");
      fetchFolders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-400 px-1 hidden sm:block">
         Your Folders
        </h3>
        <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-400 px-1 sm:hidden">
         ☰ Your Folders
        </h3>

        <button
          onClick={() => setShowCreate(!showCreate)}
          className="rounded-md border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-xs font-mono text-yellow-400 hover:bg-yellow-500/20 transition"
        >
          + Create Folder
        </button>
      </div>

     {showCreate && (
  <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur p-5 space-y-4 shadow-lg">

    {/* Header */}
    <div className="space-y-1">
      <h3 className="text-sm font-mono text-yellow-400 tracking-wide">
        Create Folder
      </h3>
      <p className="text-xs text-zinc-500">
        Upload a file to initialize this folder
      </p>
    </div>

    {/* Folder Name */}
    <div className="space-y-1">
      <label className="text-[11px] text-zinc-500 font-mono">
        Folder Name
      </label>
      <input
        placeholder="e.g. avatars / invoices / assets"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-yellow-400 transition"
      />
    </div>

    {/* File Upload */}
    <div className="space-y-1">
      <label className="text-[11px] text-zinc-500 font-mono">
        Upload File
      </label>

      <div className="relative flex items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 px-4 py-6 text-center hover:border-yellow-400/40 transition cursor-pointer">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <p className="text-xs text-zinc-400 font-mono">
          {file ? file.name : "Click to upload or drag & drop"}
        </p>
      </div>
    </div>

    {/* Action */}
    <button
      onClick={handleCreateFolder}
      disabled={!file || !folderName}
      className="w-full rounded-lg bg-yellow-400 text-black py-2 text-xs font-mono font-semibold tracking-wide hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      Create & Upload
    </button>

  </div>
)}

      {/* Folder Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {folders.map((f) => (
          <Link  key={f._id} to={`/dashboard/files/${f.foldername}`}><div
            key={f._id}
            onClick={() =>{}}
            className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-950 hover:border-yellow-500/40 hover:bg-yellow-500/5 transition p-4 flex flex-col items-center"
          >
            <span className="text-3xl text-yellow-400">📁</span>
            <span className="mt-2 text-xs text-zinc-300 font-mono text-center truncate w-full">
              {f.foldername}
            </span>
          </div>
          </Link>
        ))}
      </div>

     
    </section>
  );
} 
export default Filesandfolder;