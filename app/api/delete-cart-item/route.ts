import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { productId, cartItemId } = await req.json();

  await prisma.cartItem.deleteMany({
    where: {
      id: cartItemId,
      productId,
    },
  });

  revalidatePath("/cart");
  return NextResponse.json({ message: "CartItem deleted successfully" });
}
