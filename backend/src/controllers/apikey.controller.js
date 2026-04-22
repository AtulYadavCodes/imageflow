import { asyncHandler } from "../utils/asyncHandler.js";
import errorhandler from "../utils/errorhandler.js";
import responseHandler from "../utils/responseHandler.js";
import { ApiKey } from "../models/apiKey.model.js";
import { generateApiKey } from "../utils/apikey.js";

const createApiKey = asyncHandler(async (req, res) => {
  

  const { name = "" } = req.body || {};
  const { rawKey, keyHash, prefix } = generateApiKey();

  const apiKey = await ApiKey.create({
    user: req.user._id,
    name,
    keyHash,
    prefix,
  });

  return res.status(201).json(
    new responseHandler(201, "API key created successfully", {
      apiKey: {
        _id: apiKey._id,
        user: apiKey.user,
        name: apiKey.name,
        prefix: apiKey.prefix,
        revoked: apiKey.revoked,
        lastUsedAt: apiKey.lastUsedAt,
        createdAt: apiKey.createdAt,
        updatedAt: apiKey.updatedAt,
      },
      key: rawKey,
    }),
  );
});

const listApiKeys = asyncHandler(async (req, res) => {
 

  const apiKeys = await ApiKey.find({ user: req.user._id })
    .select("-keyHash")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new responseHandler(200, "API keys fetched successfully", apiKeys));
});

const revokeApiKey = asyncHandler(async (req, res) => {
  

  const revokedApiKey = await ApiKey.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    {
      $set: { revoked: true },
    },
    { new: true },
  ).select("-keyHash");

  if (!revokedApiKey) {
    throw new errorhandler(404, "API key not found");
  }

  return res
    .status(200)
    .json(
      new responseHandler(200, "API key revoked successfully", revokedApiKey),
    );
});

export { createApiKey, listApiKeys, revokeApiKey };
