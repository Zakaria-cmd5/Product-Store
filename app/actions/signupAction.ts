"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import z from "zod";
import prisma from "../../prisma/client";

async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const signupFormSchema = z.object({
  userName: z
    .string()
    .min(2, "Your name is too short")
    .max(20, "Your name is too long")
    .trim(),
  email: z.string().email("Invalid email format").trim(),
  password: z
    .string()
    .min(8, "Your password is too short")
    .max(255, "Your password is too long")
    .trim(),
  reEnterPassword: z
    .string()
    .min(8, "Your password is too short")
    .max(255, "Your password is too long")
    .trim(),
});

interface CreateUserFormState {
  errors?: {
    userName?: string[];
    email?: string[];
    password?: string[];
    reEnterPassword?: string[];
  };
  message?: string | null;
}

export async function signupAction(
  prevState: CreateUserFormState,
  formData: FormData
): Promise<CreateUserFormState> {
  const userName = formData.get("userName");
  const email = formData.get("email");
  const password = formData.get("password");
  const reEnterPassword = formData.get("reEnterPassword");

  const validation = signupFormSchema.safeParse({
    userName,
    email,
    password,
    reEnterPassword,
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  if (password !== reEnterPassword) {
    return {
      message: "Password and Re Enter Password Must be matched",
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      userName: validation.data.userName,
    },
  });

  if (user) {
    return {
      message: "User is already exist",
    };
  }

  const hashedPassword = await hashPassword(validation.data.password);

  try {
    await prisma.user.create({
      data: {
        userName: validation.data.userName,
        email: validation.data.email,
        password: hashedPassword,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    return { message: "Signup Error" };
  }

  redirect("/login");
}
