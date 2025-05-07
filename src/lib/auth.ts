// /lib/auth.ts
import { UserType } from "@/types";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;

// Sign access token (15 mins expiry)
export const signAccessToken = (user: UserType) =>
  jwt.sign({ sub: user._id, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

// Sign refresh token (7 days expiry)
export const signRefreshToken = (user: UserType) =>
  jwt.sign({ sub: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

// Verify access token
export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Token is invalid or expired");
    }
    return decoded;
  });

// Verify refresh token
export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Refresh token is invalid or expired");
    }
    return decoded;
  });

// Verify token and ensure it's an admin
export const verifyTokenAndAdmin = (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    console.error("Unauthorized: Token not provided");
    throw new Error("Unauthorized");
  }

  try {
    const decoded = verifyAccessToken(token) as unknown as { sub: string; role: string };
    
    if (!decoded || typeof decoded.role !== "string") {
      console.error("Forbidden: Token does not contain role");
      throw new Error("Forbidden");
    }

    if (decoded.role !== "admin") {
      console.error("Forbidden: User is not an admin");
      throw new Error("Forbidden");
    }

    return decoded; // Return the decoded token (admin)
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during token verification:", error.message);
    } else {
      console.error("Error during token verification:", error);
    }
    throw new Error("Token verification failed");
  }
};
