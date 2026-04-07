import { Request, Response } from "express";
import prisma from "../config/prisma";
import { createProductSchema } from "../schemas/product.schema";

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validationResult = createProductSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        message: "Validation failed",
        error: validationResult.error.flatten().fieldErrors,
      });
      return;
    }
    const { title, description, basePrice, variants } = validationResult.data;

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        basePrice,
        variants: {
          create: variants,
        },
      },

      include: {
        variants: true,
      },
    });

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
