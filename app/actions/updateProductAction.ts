"use server";

import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

interface UpdateProductFormState {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    image?: string[];
  };
  message?: string | null;
}

const updateProductSchema = z.object({
  name: z
    .string()
    .min(3, "Product name is too short")
    .max(20, "Product name is too long")
    .trim(),
  description: z
    .string()
    .min(3, "Description is too short")
    .max(255, "Description is too long")
    .trim(),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), "Price must be a valid number"),
  image: z.string().url("Image URL must be valid"),
});

export async function updateProductAction(
  productId: number,
  prevState: UpdateProductFormState,
  formData: FormData
): Promise<UpdateProductFormState> {
  const name = formData.get("name");
  const description = formData.get("desc");
  const price = formData.get("price");
  const image = formData.get("image");

  const validation = updateProductSchema.safeParse({
    name,
    description,
    price,
    image,
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "Please enter valid fields",
    };
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: validation.data.name,
      description: validation.data.description,
      price: validation.data.price,
      image: validation.data.image,
    },
  });

  revalidatePath(`/product/${productId}`);
  redirect(`/product/${productId}`);
}
