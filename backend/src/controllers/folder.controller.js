import { File } from "../models/file.model.js";
import { Folder } from "../models/folder.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorhandler from "../utils/errorhandler.js";
import responseHandler from "../utils/responseHandler.js";
import { getFileFromS3 } from "../utils/uploadonawss3bucket.js";

import mongoose from "mongoose";

const createfolder = asyncHandler(async (req, res) => {
  const newfolder = await Folder.create({
    foldername: req.body.foldername,
    owner: req.user._id,
  });
  if (!newfolder) {
    throw new errorhandler(500, "folder not created", []);
  } else
    return res
      .status(200)
      .json(new responseHandler(200, "folder created successfully", newfolder));
});

const getalluserfolders = asyncHandler(async (req, res) => {
  const userfolders = await Folder.find({ owner: req.user._id });
  if (!userfolders || userfolders.length === 0) {
    throw new errorhandler(404, "folders not found", []);
  }
  res
    .status(200)
    .json(
      new responseHandler(
        200,
        "User folders fetched successfully",
        userfolders,
      ),
    );
});

const deletefolder = asyncHandler(async (req, res) => {
  const foldername = req.params.foldername.trim().toLowerCase();
  const folder = await Folder.findOne({
    foldername: foldername,
    owner: req.user._id,
  });
  if (!folder) {
    throw new errorhandler(404, "folder not found", []);
  }
  const filesinfolder = File.find({ folder: folder._id }).select("_id");
  await File.deleteMany({ _id: { $in: filesinfolder } });
  const deletedfolder = await Folder.findByIdAndDelete(folder._id);
  return res
    .status(200)
    .json(
      new responseHandler(
        200,
        "folder deleted successfully",
        deletedfolder._id,
      ),
    );
});

const allfilesinfolder = asyncHandler(async (req, res) => {
  const foldername = req.params.foldername.trim().toLowerCase();
  const folder = await Folder.findOne({
    foldername: foldername,
    owner: req.user._id,
  });
  if (!folder) {
    throw new errorhandler(404, "folder not found", []);
  }
  const files = await File.find({ folder: folder._id });
  if (!files || files.length === 0) {
    throw new errorhandler(404, "folder not found", []);
  }  

  //if key is stored and filelink to send
//for (const file of files) {
 // file.filelink = await getFileFromS3(file.filelink);
 //} //this is sequential and can be slow if there are many files, so we can use Promise.all to run all the getFileFromS3 calls in parallel and wait for all of them to complete before sending the response
 
 files.map(file=>{
    file.filelink=`${process.env.baseurl}/images/path/${file.filelink}`;
 })
  return res
    .status(200)
    .json(
      new responseHandler(200, "files in folder fetched successfully", files),
    );
});

export { createfolder, getalluserfolders, deletefolder, allfilesinfolder };
