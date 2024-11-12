import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoute = ["/cart", "/payment-success", /^\/order\/.*/];
const adminRoutes = ["/newProduct"];
const publicRoutes = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoute.some((route) =>
    typeof route === "string" ? route === path : route.test(path)
  );
  const isAdminRoute = adminRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = await cookies();
  const decryptCookie = cookie.get("session")?.value;
  const session = cookie ? await decrypt(decryptCookie) : null;

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/signup", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isAdminRoute && session?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
