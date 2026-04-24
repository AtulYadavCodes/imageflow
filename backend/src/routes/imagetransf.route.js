import { Router } from "express";
import { imagetransf } from "../controllers/imagetransfr.controller.js";
const router = Router();
router.route("/path/*key").get(imagetransf);
export default router;
