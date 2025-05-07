// /app/api/auth/refresh.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, signAccessToken } from "@/lib/auth";
import { User } from "@/lib/models/User";
import connectDB from "@/lib/db";

export async function POST(req: NextRequest) {
  await connectDB();
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const payload: any = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.sub);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

    const accessToken = signAccessToken(user);
    return NextResponse.json({ accessToken });
  } catch {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });
  }
}
