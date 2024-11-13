"use server";

import prisma from "@/prisma/client";
import { getCurrentUser } from "@/queries/getCurrentUser";
import { redirect } from "next/navigation";

export async function addToCartAction(productId: number) {
  const user = await getCurrentUser();

  if (!user?.id) {
    throw new Error("User must be logged in to add items to the cart.");
  }

  const existingProduct = await prisma.cartItem.findFirst({
    where: {
      productId,
      userId: user.id,
    },
  });

  if (existingProduct) {
    return await prisma.cartItem.update({
      where: {
        id: existingProduct.id,
      },
      data: {
        quantity: existingProduct.quantity + 1,
      },
    });
  }

  await prisma.cartItem.create({
    data: {
      productId,
      userId: user.id,
      quantity: 1,
    },
  });

  redirect("/cart");
}
