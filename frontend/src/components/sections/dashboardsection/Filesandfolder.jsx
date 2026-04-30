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

  

  const handleUpload = async () => {
    if (!file || !selectedFolder) return;

    try {
      await imageflowuploadfunction(
        file,
        "",
        selectedFolder.foldername
      );
      setFile(null);
    
    } catch (err) {
      console.log(err);
    }
  };

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
    <section className="mx-auto w-full max-w-6xl px-4 py-12">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-mono text-sm uppercase tracking-widest text-zinc-400">
          Your Folders
        </h2>

        <button
          onClick={() => setShowCreate(!showCreate)}
          className="rounded-md border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-xs font-mono text-yellow-400 hover:bg-yellow-500/20 transition"
        >
          + Create Folder
        </button>
      </div>

      {/* Create Panel */}
      {showCreate && (
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
          <p className="text-xs text-yellow-400 font-mono">
            Upload a file to create a folder
          </p>

          <input
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm text-zinc-400"
          />

          <button
            onClick={handleCreateFolder}
            disabled={!file || !folderName}
            className="w-full bg-yellow-400 text-black py-2 text-xs font-mono rounded-md disabled:opacity-50"
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