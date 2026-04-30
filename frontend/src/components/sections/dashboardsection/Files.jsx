import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TryoutSection from "../TryoutSection";

function Files() {
  const { foldername } = useParams();

  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedImageKey, setSelectedImageKey] = useState(null);

  // fetch files
  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/v1/folders/getallfilesinfolder/${foldername}`,
        { withCredentials: true }
      );

      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setFiles(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [foldername]);

  // upload
  const handleUpload = async () => {
    if (!file) return;

    try {
      const { imageflowuploadfunction } = await import(
        "../../../../imageflowsdk-browser/imageflowuploadfunction"
      );

      await imageflowuploadfunction(file, "", foldername);

      setFile(null);
      fetchFiles();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10">

      {/* Header */}
      <div className="mb-6 ">
        <h2 className="font-mono text-sm uppercase tracking-widest text-zinc-400">
          Folder: {foldername}
        </h2>

      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {files.length === 0 ? (
          <p className="text-zinc-600 font-mono text-sm">
            empty folder
          </p>
        ) : (
          files.map((f) => (
            <img
              key={f._id}
              src={`${import.meta.env.VITE_API_BASE}/images/path/${f.filekey}`}
              alt={f.filename}
              onClick={() => setSelectedImageKey(f.filekey)}
              className="h-32 w-full object-cover rounded-lg border border-zinc-800 cursor-pointer hover:scale-105 transition"
            />
          ))
        )}
      </div>

      {/* Upload */}
      <div className="max-w-md space-y-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-sm text-zinc-400"
        />

        <button
          onClick={handleUpload}
          disabled={!file}
          className="w-full bg-yellow-400 text-black py-2 text-xs font-mono rounded-md"
        >
          Upload
        </button>
      </div>

      {/* 🔥 Tryout Modal */}
      {selectedImageKey && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedImageKey(null);
          }}
        >
          <button
            onClick={() => setSelectedImageKey(null)}
            className="fixed top-5 right-5 z-10 text-zinc-400 hover:text-white text-xl"
          >
            ✕
          </button>

          <div className="max-w-7xl mx-auto py-10 px-4">
            <TryoutSection KEY={selectedImageKey} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Files;