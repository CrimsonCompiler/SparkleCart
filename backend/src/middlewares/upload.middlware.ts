import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import dotenv from "dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file) => {
    return {
      folder: "sparklecart",
      allowed_formarts: ["jpg", "jpeg", "png"],
    };
  },
});

export const upload = multer({ storage: storage });
