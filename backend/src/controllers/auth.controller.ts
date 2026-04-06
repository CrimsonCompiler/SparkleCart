import { Request, Response } from "express";
import { loginSchema, registrationSchema } from "../schemas/auth.schema";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

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
      userData: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error: ", error); // showing in the console ?
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ==================
// Customer Login
// ==================

export const customerLogin = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.safeParse(req.body);

    if (!validatedData.success) {
      res.status(400).json({
        message: "Validation failed",
        error: validatedData.error.flatten().fieldErrors,
      });
    }
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =====================
// Get Customer Profile
// =====================

export const getCustomerProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const customerId = req.user?.id;

    if (!customerId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!customer) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "VIP Entry Successful",
      customer,
    });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
