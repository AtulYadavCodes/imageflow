import sharp from "sharp";
import asyncHandler from "../utils/asyncHandler.js";
import errorhandler from "../utils/errorhandler.js";
import responseHandler from "../utils/responseHandler.js";
import {s3, getFileFromS3, uploadonawss3bucket } from "../utils/uploadonawss3bucket.js";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
const imagetransf=asyncHandler(async(req,res)=>{;
    const {width,height,quality,format}=req.query;
    const fileobject=await s3.send(new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key,}));
    let pipeline=sharp();
    if(width&&height) pipeline=pipeline.resize({width:Number(width),height:Number(height)});
    else if(width) pipeline=pipeline.resize({width:Number(width)});
    else if(height) pipeline=pipeline.resize({height:Number(height)});
   
    if(quality) pipeline=pipeline.jpeg({quality:Number(quality)});
    if(format) pipeline=pipeline.toFormat(format);
    res.setHeader("Content-Type", `image/${format||"jpeg"}`);
    fileobject.Body.pipe(pipeline).pipe(res)
})
export {imagetransf};