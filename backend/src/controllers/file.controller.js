import mongoose from "mongoose";
import responseHandler from "../utils/responseHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorhandler from "../utils/errorhandler.js";
import { File } from "../models/file.model.js";
import { Folder } from "../models/folder.model.js";
import uploadoncloudinary, { getFileFromS3, uploadonawss3bucket } from "../utils/uploadonawss3bucket.js";
import { get } from "node:http";

const getalluserfiles = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortby = "createdAt",
    sorttype = "desc",
  } = req.query;
  const userfiles = await File.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $sort: {
        [sortby]: sorttype === "asc" ? 1 : -1,
      },
    },
    {
      $skip: (Number(page) - 1) * limit,
    },
    {
      $limit: Number(limit),
    },
  ]);
  if (!userfiles || userfiles.length === 0) {
    throw new errorhandler(404, "files not found", []);
  }

  

  res
    .status(200)
    .json(
      new responseHandler(200, "User files fetched successfully", userfiles),
    );
});

const uploadfileinitiate=asyncHandler(async(req,res)=>{ // This function will generate a pre-signed URL for uploading the file to S3 directly from the client. The client will then use this URL to upload the file, and after successful upload, it will call another endpoint to save the file metadata in the database.
    const key=`${req.user._id}/${req.body.originalname}-${Date.now()}`;
    const uploadurl=await uploadonawss3bucket(key,req.body.contentType);
    if(!uploadurl){
        throw new errorhandler(500,"Failed to get upload URL from S3",[]);
    }
    res.status(200).json(new responseHandler(200,"Upload URL generated successfully",{uploadurl,key}));
})
const uploadfilesave = asyncHandler(async (req, res) => { // This function will be called after the file is uploaded to S3 using the pre-signed URL
  const foldername = req.params?.foldername.trim().toLowerCase();
  let folder;
  if (foldername) {
    folder = await Folder.findOne({
      foldername: foldername,
      owner: req.user._id,
    });
    if (!folder) {
      folder = await Folder.create({
        foldername: foldername,
        owner: req.user._id,
      });
    }
  }
  /*const urldownload=await getFileFromS3(req.body.key);
    if(!urldownload){
        throw new errorhandler(500,"Failed to get file URL fr",[]);
    }*/
  const newfile = await File.create({
    filekey: req.body.key,
    filename: req.body.originalname,
    owner: req.user._id,
    filesize: req.body.bytes,
    folder: folder._id,

    filelink:`${process.env.baseurl}/images/path/${req.body.key}`,
  });
  const savedfile = await File.findById(newfile._id);
  if (!savedfile) {
    throw new errorhandler(500, "file not saved", []);
  }
  res
    .status(200)
    .json(new responseHandler(200, "file uploaded successfully", savedfile));
});
export { getalluserfiles, uploadfileinitiate, uploadfilesave };
