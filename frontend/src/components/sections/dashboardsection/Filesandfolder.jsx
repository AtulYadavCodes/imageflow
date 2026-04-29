import React, { useEffect, useState } from "react";
import axios from "axios";
import { imageflowuploadfunction } from "../../../../imageflowsdk-browser/imageflowuploadfunction";

function Filesandfolder() {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [folderName, setFolderName] = useState("");

  // fetch folders
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE}/api/v1/folders/getalluserfolders`, {
        withCredentials: true,
      })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setFolders(data);
      })
      .catch((err) => console.log(err));
  }, []);

  
  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    setFolderName(folder.foldername); // auto-fill
    setFiles([]);

    axios
      .get(
        `${import.meta.env.VITE_API_BASE}/api/v1/folders/getallfilesinfolder/${folder.foldername}`,
        { withCredentials: true }
      )
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setFiles(data);
      })
      .catch((err) => console.log(err));
  };

  // upload
  const handleUpload = async () => {
    if (!file || !apiKey || !folderName) {
      console.log("missing file/apiKey/folderName");
      return;
    }

    try {
      const res = await imageflowuploadfunction(file, apiKey, folderName);
      console.log("uploaded:", res);

      if (selectedFolder && selectedFolder.foldername === folderName) {
        handleFolderClick(selectedFolder);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div >
      
      <div>
        <h3>📁 Folders</h3>
        {folders.map((f) => (
          <div
            key={f._id}
            onClick={() => handleFolderClick(f)}
           
          >
            {f.foldername}
          </div>
        ))}
      </div>

      <div >
        <h3>
          📄 Files {selectedFolder && `in ${selectedFolder.foldername}`}
        </h3>

        <div >
          {files.length === 0 ? (
            <p>No files</p>
          ) : (
            files.map((f) => (
              <div key={f._id} >
                {f.filename}
              </div>
            ))
          )}
        </div>

        <hr />

        <h3>⬆️ Upload</h3>

        <div >
          <input
            placeholder="API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />

          <input
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
}

export default Filesandfolder;