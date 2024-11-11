import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productId, userId } = await req.json();

  try {
    await prisma.cartItem.deleteMany({
      where: {
        AND: [{ productId }, { userId }],
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}
