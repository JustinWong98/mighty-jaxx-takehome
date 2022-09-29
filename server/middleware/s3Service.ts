import { S3 } from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
export const s3Upload = async (file: Express.Multer.File) => {
  const s3 = new S3();
  const imageName = file.originalname.toLowerCase().split(" ").join("-");
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `images/${imageName}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};

export const s3Edit = async (file: Express.Multer.File) => {
  const s3 = new S3();
  const imageName = file.originalname.toLowerCase().split(" ").join("-");
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `images/${imageName}`,
  };
  try {
    const data = await s3.headObject(param).promise();
    return false;
  } catch (err: any) {
    if (err.statusCode === 403) {
      return true;
    }

    throw err;
  }
};
