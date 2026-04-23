import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { imagetransf } from "../controllers/imagetransfr.controller.js";
const router=Router();
router.route("/imagetransf").post(verifyJWT,imagetransf);
export default router;