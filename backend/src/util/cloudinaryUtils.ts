import cloudinary from 'cloudinary';
import EnvVars from '@src/constants/EnvVars';
import { unlinkSync } from "fs";
const cloudinaryClient = cloudinary.v2;
cloudinaryClient.config({
  cloud_name: EnvVars.CLOUDINARY_CLOUD_NAME,
  api_key: EnvVars.CLOUDINARY_API_KEY,
  api_secret: EnvVars.CLOUDINARY_SECRET_KEY,
});

async function uploadImage(image: any): Promise<string>{
  try {
    const result = await cloudinaryClient.uploader.upload(image).then((result) => {
      unlinkSync(image);
      return result;
    });
    return result.url;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
export default {
  uploadImage
} as const;