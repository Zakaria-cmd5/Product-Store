import prisma from "@/prisma/client";

export async function getAllProduct() {
  const products = await prisma.product.findMany();

  return products;
}
