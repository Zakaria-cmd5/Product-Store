import prisma from "@/prisma/client";
import { getCurrentUser } from "./getCurrentUser";

export async function getAllCartItem() {
  const userId = await getCurrentUser();

  if (!userId) {
    throw new Error("User must be logged in to add items to the cart.");
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId,
    },
    include: {
      product: { select: { price: true, name: true, image: true } },
    },
  });

  return cartItems;
}
