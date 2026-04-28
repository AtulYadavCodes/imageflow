import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import errorhandler from "./errorhandler.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
});

const uploadoncloudinary = async (filePath, option) => {
  try {
    if (!filePath) return;
    const result = await cloudinary.uploader.upload(filePath, {
      ...option,
      resource_type: "auto",
    });
    //file has been uploaded
    fs.unlinkSync(filePath); // Remove file from server after upload
    console.log(result.url);
    return result;
  } catch (error) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("Cloudinary upload error:", error);
    throw new errorhandler(
      error?.statusCode || 500,
      error?.message || "Cloudinary upload failed",
      [error],
    );
  }
};

export default uploadoncloudinary;

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadonawss3bucketavatar = async (filepathofavatar, key) => {
  try {
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: fs.createReadStream(filepathofavatar),
      ContentType: "image/jpeg",
    });
    const response = await s3.send(uploadCommand);
    fs.unlink(filepathofavatar, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    }); // Remove file from server after upload
    return response;
  } catch (error) {
    console.error("AWS ", error);
    if (filepathofavatar && fs.existsSync(filepathofavatar)) {
      fs.unlink(filepathofavatar, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    }
  }
};

const uploadonawss3bucket = async (key, contentType) => {
  try {
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });
    return await getSignedUrl(s3, uploadCommand);
  } catch (error) {
    console.error("AWS ", error);
    throw new errorhandler(
      error?.statusCode || 500,
      error?.message || "AWS S3 upload failed",
      [error],
    );
  }
};

const getFileFromS3 = async (key) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });
    const url = await getSignedUrl(s3, command);
    return url;
  } catch (error) {
    console.error("AWS", error);
    throw new errorhandler(
      error?.statusCode || 500,
      error?.message || "AWS S3 get file failed",
      [error],
    );
  }
};

export { s3, uploadonawss3bucket, getFileFromS3, uploadonawss3bucketavatar };
