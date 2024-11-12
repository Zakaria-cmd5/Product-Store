import prisma from "@/prisma/client";

export async function getProduct(productId: number | undefined) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });

  return product;
}
