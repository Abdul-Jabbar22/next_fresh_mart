import connectDB from "@/lib/db";

import User from "@/lib/models/User";
import { NextResponse } from "next/server";

type RegisterBody = {
  username: string;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  await connectDB();
  const body: RegisterBody = await req.json();

  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await(body.password, 10);

  const newUser = new User({
    username: body.username,
    email: body.email,
    password: hashedPassword,
  });

  await newUser.save();

  return NextResponse.json({ message: "Registration successful" }, { status: 201 });
}
