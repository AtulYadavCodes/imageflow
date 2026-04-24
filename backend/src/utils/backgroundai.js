import fs from "node:fs";
import { asyncHandler } from "./asyncHandler.js";
import errorhandler from "./errorhandler.js";

const removeBg = async(imageURL) => {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_url", imageURL);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": process.env.REMOVEBG_API_KEY },
    body: formData,
  });

  if (response.ok) {
    return await response.body;
  } else {
    throw new errorhandler(`${response.status}: ${response.statusText}`);
  }
}
export { removeBg };