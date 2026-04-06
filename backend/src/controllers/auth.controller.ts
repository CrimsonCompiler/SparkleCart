import { Request, Response } from "express";
import { registrationSchema } from "../schemas/auth.schema";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import prisma from "../config/prisma";
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

    const existingUser = await prisma.customer.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({
        message: "User with this email already exists",
      });
      return;
    }

    // 3. password hashing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Create a new user
    const newUser = await prisma.customer.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    // 5. Generate JWT token
    const token = generateToken(newUser.id, newUser.role);

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
