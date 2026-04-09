import { Request, Response } from "express";
import prisma from "../config/prisma";
import { syncCartSchema } from "../schemas/cart.schema";

export const syncCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const validationResult = syncCartSchema.safeParse(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        message: "Invalid Cart Data",
        error: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { items } = validationResult.data;

    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        message: "Please login to sync your cart",
      });
      return;
    }

    const cart = await prisma.cart.upsert({
      where: { userId: userId },
      create: { userId: userId },
      update: {},
    });

    await Promise.all(
      items.map((item) => {
        return prisma.cartItem.upsert({
          where: {
            cartId_variantId: {
              cartId: cart.id,
              variantId: item.variantId,
            },
          },
          create: {
            cartId: cart.id,
            variantId: item.variantId,
            quantity: item.quantity,
          },
          update: {
            quantity: { increment: item.quantity },
          },
        });
      }),
    );

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
                images: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      message: "Cart synced successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Cart Sync Error:", error);
    res.status(500).json({ message: "Internal server error during cart sync" });
  }
};
