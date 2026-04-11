import { Request, Response } from "express";
import prisma from "../config/prisma";

export const checkoutCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Please login to checkout" });
      return;
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: "Your cart is empty!" });
      return;
    }

    let amount = 0;
    for (const item of cart.items) {
      if (item.variant.stockQuantity < item.quantity) {
        res.status(400).json({
          message: `Sorry, ${item.variant.product.title} (${item.variant.size} - ${item.variant.color}) is out of stock!`,
        });
        return;
      }

      amount += Number(item.variant.product.basePrice) * item.quantity;
    }

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: userId,
          totalAmount: amount,
          items: {
            create: cart.items.map((item) => ({
              variantId: item.variantId,
              quantity: item.quantity,
              priceAtPurchase: item.variant.product.basePrice,
            })),
          },
        },
      });

      for (const item of cart.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            stockQuantity: { decrement: item.quantity },
          },
        });
      }

      await tx.cartItem.deleteMany({
        where: { id: cart.id },
      });

      return order;
    });

    res.status(201).json({
      message: "Order placed successfully! 🎉",
      orderId: result.id,
      totalPaid: result.totalAmount,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ message: "Internal server error during checkout" });
  }
};

// =========================
// GET USER ORDERS
// =========================

export const getUserOrders = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // 1. Grab the user Id
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        message: "Please login to view your orders",
      });
      return;
    }

    // 2. Fetching the orders using the userId
    const orders = prisma.order.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
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

    // 3. If no orders available
    if ((await orders).length === 0) {
      res.status(200).json({
        message: "You haven't placed any order yet",
        orders: [],
      });
      return;
    }

    // 4. If the orders are available
    res.status(200).json({
      message: "Order history fetched successfully",
      totalOrders: (await orders).length,
      orders: orders,
    });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching orders" });
  }
};
