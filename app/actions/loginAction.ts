"use server";

import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import z from "zod";
import prisma from "../../prisma/client";

const LoginFormSchema = z.object({
  userName: z
    .string()
    .min(2, "Your name is too short")
    .max(20, "Your name is too long")
    .trim(),
  email: z
    .string()
    .min(11, "your email are invalid or too small")
    .max(255, "your email are invalid or too long")
    .trim(),
  password: z
    .string()
    .min(8, "your password are invalid or too small")
    .max(255, "your password are invalid or too long")
    .trim(),
});

interface LoginUserFormState {
  errors?: {
    userName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
}

export async function loginAction(
  prevState: LoginUserFormState,
  formData: FormData
): Promise<LoginUserFormState> {
  const userName = formData.get("userName");
  const email = formData.get("email");
  const password = formData.get("password");

  const validation = LoginFormSchema.safeParse({ userName, email, password });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "Login Error",
    };
  }

  const User = await prisma.user.findFirst({
    where: {
      email: validation.data.email,
    },
  });

  if (User?.email !== email) {
    return {
      errors: {
        email: ["Invaild email or password"],
      },
    };
  }

  if (User.userName !== userName) {
    return {
      errors: {
        userName: ["User name is exist before"],
      },
    };
  }

  const isPasswordValid = await bcrypt.compare(
    validation.data.password,
    User.password
  );

  if (!isPasswordValid) {
    return {
      errors: { password: ["Invalid email or password"] },
    };
  }

  const userId = User.id.toString();
  await createSession(userId);

  redirect("/");
}
