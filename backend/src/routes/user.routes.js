import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { loginuser, logoutuser, registerUser,refreshAccessToken, returnuserProfile,updateuseravatar,updateuserpassword,updateuseremail} from "../controllers/user.controller.js"
import { verifyJWT,requireJwtAuth } from "../middlewares/auth.middleware.js"

import { ratelimMiddleware } from "../middlewares/ratelim.middleware.js"
const router=Router()
router.route('/register').post(
    upload.single('avatar'),
    registerUser)
router.route('/login').post(upload.none(),ratelimMiddleware, loginuser)


//secured routes 
router.route('/logout').post(verifyJWT,requireJwtAuth,logoutuser);
router.route('/refreshAccessToken').post(refreshAccessToken);
router.route('/profile').get(verifyJWT,requireJwtAuth,returnuserProfile);
router.route('/updateprofileavatar').patch(verifyJWT,requireJwtAuth,upload.single('avatar'),updateuseravatar);
router.route('/updatepassword').post(verifyJWT,requireJwtAuth,upload.none(),updateuserpassword);
router.route('/updateemail').patch(verifyJWT,requireJwtAuth,upload.none(),updateuseremail);
export default router