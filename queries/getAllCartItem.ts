import prisma from "@/prisma/client";
import { getCurrentUser } from "./getCurrentUser";

export async function getAllCartItem() {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("User must be logged in to add items to the cart.");
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId: user.id,
    },
    include: {
      product: { select: { id: true, price: true, name: true, image: true } },
    },
  });

  return cartItems;
}
