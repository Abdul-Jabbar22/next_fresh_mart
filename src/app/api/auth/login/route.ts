// /app/api/auth/login.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  const res = NextResponse.json({ accessToken });
  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return res;
}
