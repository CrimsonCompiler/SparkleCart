import { z } from "zod";

export const syncCartSchema = z.object({
  items: z
    .array(
      z.object({
        variantId: z.string().min(1, "Variant ID is required"),
        quantity: z.number().int().positive("Quantity must be a positive"),
      }),
    )
    .min(1, "Cart cannot be empty"),
});
