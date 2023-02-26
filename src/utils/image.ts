import Jimp from "jimp";

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
