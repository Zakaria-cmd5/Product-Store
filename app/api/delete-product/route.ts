import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { productId } = await req.json();

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/");
  return NextResponse.json({ message: "Product deleted successfully" });
}
