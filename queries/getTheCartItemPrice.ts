import prisma from "@/prisma/client";

export async function getTheCartItemPrice(productId: number, userId: number | undefined) {
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      AND: [{ userId }, { productId }],
    },
    include: {
      product: { select: { price: true } },
    },
  });

  if (!cartItem) return;

  return cartItem?.quantity * cartItem?.product?.price;
}
