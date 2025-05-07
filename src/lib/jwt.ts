import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "token";

export const createToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const setTokenCookie = async (token: string) => {
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const removeTokenCookie = () => {
  cookies().delete(COOKIE_NAME);
};

export const getTokenFromCookie = () => {
  return cookies().get(COOKIE_NAME)?.value;
};
