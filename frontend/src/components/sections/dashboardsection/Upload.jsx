
import React, { useRef, useState } from "react";
// import { imageflowuploadfunction } from "./imageflowuploadfunction.js"; // Uncomment and adjust import path as needed

function Upload() {
    const [apiKey, setApiKey] = useState("");
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState("");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();

    // Dummy upload function for demonstration. Replace with your SDK import.
    async function imageflowuploadfunction(file, apiKey, folder) {
        // Simulate async upload
        return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1200));
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = fileInputRef.current.files[0];
        if (!file || !apiKey) {
            setStatus("Please select a file and enter an API key");
            setStatusType("error");
            return;
        }
        setLoading(true);
        setStatus("Communicating with ImageFlow...");
        setStatusType("");
        try {
            // Replace with actual SDK call
            const result = await imageflowuploadfunction(file, apiKey, "documents");
            console.log("Upload Result:", result);
            setStatus("Success! File uploaded to S3.");
            setStatusType("success");
        } catch (error) {
            setStatus("Upload failed: " + (error.message || error));
            setStatusType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50">
            <form
                className="card bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-blue-100"
                onSubmit={handleUpload}
                style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
                <h1 className="text-xl font-bold mb-6 text-slate-800">ImageFlow Upload</h1>

                <div className="mb-4">
                    <label htmlFor="api-key" className="block text-xs font-bold text-slate-500 mb-2 uppercase">
                        API Key
                    </label>
                    <input
                        type="password"
                        id="api-key"
                        className="w-full p-3 border border-slate-300 rounded-lg"
                        placeholder="sk_xxxxxxxxxx"
                        value={apiKey}
                        onChange={e => setApiKey(e.target.value)}
                        autoComplete="off"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="file-input" className="block text-xs font-bold text-slate-500 mb-2 uppercase">
                        Select Image
                    </label>
                    <input
                        type="file"
                        id="file-input"
                        accept="image/*"
                        ref={fileInputRef}
                        className="w-full p-3 border border-slate-300 rounded-lg"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 text-white rounded-lg font-bold mt-2 hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload to S3"}
                </button>

                {status && (
                    <div
                        id="status"
                        className={`mt-4 text-sm p-3 rounded-lg ${statusType === "success"
                                ? "bg-green-100 text-green-800"
                                : statusType === "error"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                            }`}
                    >
                        {status}
                    </div>
                )}
            </form>
        </div>
    );
}

export default Upload
