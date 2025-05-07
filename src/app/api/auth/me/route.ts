import { NextResponse } from "next/server";
import { getTokenFromCookie, verifyToken } from "@/lib/jwt";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();
  const token = getTokenFromCookie();

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const decoded = verifyToken(token) as { id: string };
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
