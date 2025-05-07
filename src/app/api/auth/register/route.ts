// /app/api/auth/register.ts
import { NextRequest, NextResponse } from "next/server";
import { validateEmail, validatePassword } from "@/utils/validateInput";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/User";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!validatePassword(password)) {
    return NextResponse.json({ error: "Password too short" }, { status: 400 });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return NextResponse.json({ message: "User registered successfully" });
}
