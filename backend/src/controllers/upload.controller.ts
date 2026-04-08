import { Request, Response } from "express";

export const uploadImageConroller = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
