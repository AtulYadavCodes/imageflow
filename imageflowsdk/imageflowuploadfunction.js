//this is for frontend to upload file on aws s3 bucket using imageflow sdk

import { url } from "node:inspector";

export const imageflowuploadfunction=async(file,apikey,foldername)=>{
    try {

        const uploadurl=await fetch("/api/v1/files/uploadfile",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${apikey}`
            },
            body:JSON.stringify({
                originalname:file.name,
                contentType:file.type
            })
        });
    } catch (error) {
        console.error("Error in imageflowuploadfunction:", error);
    }

    const uploadfile=await fetch(uploadurl.uploadurl,{
        method:"PUT",
        headers:{
            "Content-Type":file.type
        },
        body:file
    })
    

    try {
        const savefile=await fetch(`/api/v1/files/uploadfile/${foldername}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${apikey}`
            },
            body:JSON.stringify({
                originalname:file.name,
                bytes:file.size,
                key:uploadurl.key
            })
        })
    
        return savefile;
    } catch (error) {
        console.error("Error in saving file metadata:", error);
    }
}