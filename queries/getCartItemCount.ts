import prisma from "@/prisma/client";

export async function getCartItemCount(userId: number | undefined) {
  if (!userId) return;

  const cartItemCount = await prisma.cartItem.count({
    where: {
      userId,
    },
  });

  return cartItemCount;
}
