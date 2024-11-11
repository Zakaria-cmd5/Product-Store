import prisma from "@/prisma/client";
import { getUserSession } from "@/utils/getUserSession";

export async function getCurrentUser() {
  const sessionId = await getUserSession();

  if (!sessionId) return;

  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(sessionId),
    },
  });

  return user?.id;
}
