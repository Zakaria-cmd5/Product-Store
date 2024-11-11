"use server";

import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export const getUserSession = async () => {
  const allCookies = await cookies(); // Await the promise here
  const cookie = allCookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  const sessionId = session?.userId?.toString();

  return sessionId;
};
