import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const createAdminIfNotExist = async () => {
  const existsedAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@email.com",
    },
  });

  if (!existsedAdmin) {
    const hashedPassword = await hashPassword("B7VHDF8PCVEW");

    await prisma.user.create({
      data: {
        userName: "Admin",
        email: "admin@email.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Admin user created successfully.");
  }
};

export default createAdminIfNotExist