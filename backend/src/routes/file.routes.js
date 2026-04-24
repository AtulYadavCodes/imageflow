import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getalluserfiles, uploadfileinitiate, uploadfilesave } from "../controllers/file.controller.js";

const router = Router();
//router.route("/uploadfile").post(verifyJWT, upload.single("file"), uploadfile);
router.route("/uploadfile").post(verifyJWT,uploadfileinitiate);
router.route("/uploadfile/:foldername").post(verifyJWT,uploadfilesave);
router.route("/getalluserfiles").get(verifyJWT, getalluserfiles);
export default router;


