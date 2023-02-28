import Jimp from "jimp";
import { env } from "../env.mjs";

export const resizeImage = async (
  input: Buffer,
  width: number,
  height = Jimp.AUTO
) => {
  try {
    const passedImage = await Jimp.read(input);
    return passedImage.resize(width, height).getBufferAsync(Jimp.MIME_PNG);
  } catch (err) {
    throw err;
  }
};

export const downloadImage = (highResId: string, name: string) => {
  fetch(`${env.NEXT_PUBLIC_AWS_BUCKET_URL}/high-res/${highResId}`, {
    method: "GET",
    headers: {
      "Content-Type": "image/png",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}.png`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
    });
};
