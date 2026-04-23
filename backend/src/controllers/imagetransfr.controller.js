import sharp from "sharp";
import asyncHandler from "../utils/asyncHandler.js";
import errorhandler from "../utils/errorhandler.js";
import responseHandler from "../utils/responseHandler.js";
import {s3, getFileFromS3, uploadonawss3bucket } from "../utils/uploadonawss3bucket.js";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
const imagetransf=asyncHandler(async(req,res)=>{;
    const {width,height,quality,format}=req.query;
    const fileobject=await S3.send(new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key,}));
    const pipeline=sharp();
    if(width) pipeline.resize({width:Number(width)});
    if(height) pipeline.resize({height:Number(height)});
    if(width&&height) pipeline.resize({width:Number(width),height:Number(height)});
    if(quality) pipeline.jpeg({quality:Number(quality)});
    if(format) pipeline.toFormat(format);
    fileobject.Body.pipe(pipeline).pipe(res)
})
export {imagetransf};