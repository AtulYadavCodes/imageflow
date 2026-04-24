import fs from "node:fs";
import { asyncHandler } from "./asyncHandler";
import errorhandler from "./errorhandler";

const removeBg = async(imageURL) => {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_url", imageURL);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": "INSERT_YOUR_API_KEY_HERE" },
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new errorhandler(`${response.status}: ${response.statusText}`);
  }
}
export { removeBg };