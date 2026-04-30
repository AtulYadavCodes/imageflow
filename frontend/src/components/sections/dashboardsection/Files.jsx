import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TryoutSection from "../TryoutSection";


function Files() {
  const { foldername } = useParams();

  const [files, setFiles] = useState([]);

  const [selectedImageKey, setSelectedImageKey] = useState(null);

  const fileInputRef = useRef(null);
  // fetch files
  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/v1/folders/getallfilesinfolder/${foldername}`,
        { withCredentials: true }
      );

      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setFiles(data);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [foldername]);

  // upload
  const handleUpload = async (file) => {
    if (!file) return;

    try {
      const { imageflowuploadfunction } = await import(
        "../../../../imageflowsdk-browser/imageflowuploadfunction"
      );

      await imageflowuploadfunction(file, "", foldername);


      fetchFiles();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 relative min-h-full ">


      <div className="mb-6 ">
        <h2 className="font-mono text-sm uppercase tracking-widest text-zinc-400">
          Folder: {foldername} - [click on a file to open it in tryout section]
        </h2>

      </div>

      {/* Images   */}
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

      {/* Upload - floating at bottom */}
      <div className="absolute bottom-4 left-0 w-full flex justify-end pb-4 pr-4  ">


        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const selected = e.target.files[0];
            if (!selected) return;




            handleUpload(selected);
          }}
          className="hidden"
        />

        {/* Visible button */}
        <button
          onClick={() => fileInputRef.current.click()}
          className="w-30 bg-yellow-400 text-black py-2 text-xs font-mono rounded-md hover:bg-yellow-300 transition shadow-lg"
        >
          + Upload File
        </button>

      </div>

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