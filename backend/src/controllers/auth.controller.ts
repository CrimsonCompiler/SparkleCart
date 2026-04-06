import { Request, Response } from "express";

// =====================
// Customer Registration
// =====================

export const customerRegister = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        message: "Name, Email and Password are required",
      });
      return;
    }

    res.status(201).json({
      message: "Register API endpoint is working",
      receivedData: {
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
