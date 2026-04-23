import { User } from "../models/user.model.js";
import { ApiKey } from "../models/apiKey.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import errorhandler from "../utils/errorhandler.js"
import jwt from "jsonwebtoken";
import crypto from "crypto";
export const verifyJWT=asyncHandler(async(req,res,next)=>{
    const authorizationHeader = req.headers["authorization"];
    const bearerToken = authorizationHeader?.replace("Bearer ","");
    const token= req.cookies?.accessToken || bearerToken;
    if(!token)
        throw new errorhandler(401,"Not authorized, token missing");

    if(token.startsWith("sk_")){
        const keyHash = crypto.createHash("sha256").update(token).digest("hex");
        const apiKey = await ApiKey.findOne({ keyHash, revoked: false });
        if(!apiKey)
            throw new errorhandler(401,"Not authorized, invalid API key");

        const user = await User.findById(apiKey.user).select("-password -refreshtoken");
        if(!user)
            throw new errorhandler(401,"Not authorized, user not found");

        apiKey.lastUsedAt = new Date();
        await apiKey.save({ validateBeforeSave: false });

        req.user=user;
        req.apiKey=apiKey;
        req.authType="apiKey";
        return next();
    }

    try {
        const decodedToken= jwt.verify(token,process.env.JWT_SECRET)
        const user= await User.findById(decodedToken.userId).select("-password -refreshtoken");
        if(!user)
            throw new errorhandler(401,"Not authorized, user not found");

        req.user=user;
        req.authType="jwt";
        return next();
    } catch (error) {
        throw new errorhandler(401,"Not authorized, invalid token");
    }
})

export const requireJwtAuth = (req,res,next)=>{
    if(req.authType!=="jwt"){
        throw new errorhandler(403,"JWT authentication is required for this route");
    }
    next();
}