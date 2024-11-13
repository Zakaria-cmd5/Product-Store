import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { quantity, type, productId, cartItemId } = await req.json();

  if (type === "decrement" && quantity === 1) {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
        productId,
      },
    });
    revalidatePath("/cart");
    return NextResponse.json({ message: "CartItme updated successfully" });
  }

  if (type === "decrement") {
    await prisma.cartItem.update({
      where: {
        id: cartItemId,
        productId,
      },
      data: {
        quantity: quantity - 1,
      },
    });
    revalidatePath("/cart");
    return NextResponse.json({ message: "CartItme updated successfully" });
  }

  if (type === "increment") {
    await prisma.cartItem.update({
      where: {
        id: cartItemId,
        productId,
      },
      data: {
        quantity: quantity + 1,
      },
    });
    revalidatePath("/cart");
    return NextResponse.json({ message: "CartItme updated successfully" });
  }
}
