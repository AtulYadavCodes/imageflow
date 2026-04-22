import { Router } from "express";
import { createApiKey,listApiKeys,revokeApiKey } from "../controllers/apikey.controller.js";
import { requireJwtAuth, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT,requireJwtAuth,createApiKey);
router.route("/list").get(verifyJWT,requireJwtAuth,listApiKeys);
router.route("/revoke/:id").delete(verifyJWT,requireJwtAuth,revokeApiKey);

export default router;
