import sharp from "sharp";
import {asyncHandler} from "../utils/asyncHandler.js";
import errorhandler from "../utils/errorhandler.js";
import responseHandler from "../utils/responseHandler.js";
import {
  s3,
  getFileFromS3,
  uploadonawss3bucket,
} from "../utils/uploadonawss3bucket.js";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { removeBg } from "../utils/backgroundai.js";

import {pipeline} from "stream/promises";

const imagetransf = asyncHandler(async (req, res) => {
  const { removebg, width, height, rotate, blur, format } = req.query;
  if (removebg === "true") { 
    const pathtofile = await getFileFromS3(req.params.key.join("/")); //get path of file from s3
    const removebgresponse = await removeBg(pathtofile); 
   
    let picpipeline = sharp();
    if (width && height)
      picpipeline = picpipeline.resize({
        width: Number(width),
        height: Number(height),
      });
    else if (width) picpipeline = picpipeline.resize({ width: Number(width) });
    else if (height) picpipeline = picpipeline.resize({ height: Number(height) });

    if (rotate) picpipeline = picpipeline.rotate(Number(rotate));

    if (blur) picpipeline = picpipeline.blur(Number(blur));
    if (format) picpipeline = picpipeline.toFormat(format);
    res.setHeader("Content-Type", `image/${format || "jpeg"}`);
   await pipeline(removebgresponse,picpipeline,res);
  } else {
    const fileobject = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key.join("/"),
      }),
    );
    let picpipeline = sharp();

   
    if (width && height)
      picpipeline = picpipeline.resize({
        width: Number(width),
        height: Number(height),
      });
    else if (width) picpipeline = picpipeline.resize({ width: Number(width) });
    else if (height) picpipeline = picpipeline.resize({ height: Number(height) });

    if (rotate) picpipeline = picpipeline.rotate(Number(rotate));

    if (blur) picpipeline = picpipeline.blur(Number(blur));
    if (format) picpipeline = picpipeline.toFormat(format);
    res.setHeader("Content-Type", `image/${format || "jpeg"}`);
    fileobject.Body.pipe(picpipeline).pipe(res);
  }
});
export { imagetransf };
