import { z } from "zod";

const variantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  stockQuantity: z.number().int().nonnegative("Stock cannot be negative"),
  sku: z.string().min(1, "SKU is required"),
});

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description mus be at least 10 characters"),
  basePrice: z.number().positive("Price must be greater than 0"),
  variants: z.array(variantSchema).min(1, "At least 1 variant is required"),
});
