import { z } from "zod";

export const updateOrderStatusSchema = z.object({
  status: z.enum(
    ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
    {
      message:
        "Invalid status. Must be PENDING, PROCESSING, SHIPPED, DELIVERED, or CANCELLED",
    },
  ),
});
