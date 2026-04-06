import { Request, Response } from "express";
import { registrationSchema } from "../schemas/auth.schema";
// =====================
// Customer Registration
// =====================

export const customerRegister = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validationResult = registrationSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        message: "Validation failed",
        error: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, email, password } = validationResult.data;

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
