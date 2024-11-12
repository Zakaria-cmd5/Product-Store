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
      message: "Please fix the errors above.",
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: validation.data.email,
    },
  });

  if (!user) {
    return {
      errors: {
        email: ["Invalid email or password."],
      },
    };
  }

  const isPasswordValid = await bcrypt.compare(
    validation.data.password,
    user.password
  );

  if (!isPasswordValid) {
    return {
      errors: { password: ["Invalid email or password"] },
    };
  }

  const userId = user.id.toString();
  await createSession(userId, user.role);

  redirect("/");
}
