// /app/api/admin/users/route.ts
import { NextRequest, NextResponse } from "next/server";

import { verifyTokenAndAdmin } from "@/lib/auth";
import { connect } from "http2";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";

// GET all users (Admin)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    // const admin = await verifyTokenAndAdmin(req);
    // if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
