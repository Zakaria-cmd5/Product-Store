import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  role: string; // Added role to the session payload
  expiresAt: Date;
};

export async function createSession(userId: string, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Set expiration to 7 days
  const session = await encrypt({ userId, role, expiresAt }); // Include role in session payload

  const cookie = await cookies();
  cookie.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  const cookie = await cookies();
  cookie.delete("session");
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return {
      userId: payload.userId as string,
      role: payload.role as string, // Return role as part of the decrypted session
      expiresAt: new Date(payload.exp! * 1000), // Convert expiration to Date
    };
  } catch (error) {
    console.log("Failed to verify session", error);
    return null;
  }
}
