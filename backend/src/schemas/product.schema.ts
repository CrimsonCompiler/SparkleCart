import { z } from "zod";

const imageSchema = z.object({
  url: z.string().url("Must be a valid url"),
  altText: z.string().optional(),
  isPrimary: z.boolean().optional().default(false),
});

const variantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  stockQuantity: z.number().int().nonnegative("Stock cannot be negative"),
  sku: z.string().min(1, "SKU is required"),
  images: z.array(imageSchema).optional(),
});

export const createProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description mus be at least 10 characters"),
  basePrice: z.number().positive("Price must be greater than 0"),
  images: z.array(imageSchema).optional(),
  variants: z.array(variantSchema).min(1, "At least 1 variant is required"),
});
