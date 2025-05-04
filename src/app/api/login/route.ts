import connectDB from "@/lib/db";
import User from "@/lib/models/User";

import { NextResponse } from "next/server";


type LoginBody = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  await connectDB();
  const body: LoginBody = await req.json();

  const user = await User.findOne({ email: body.email });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await(body.password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }


  return NextResponse.json({message: "login successfully"}, { status: 200 });
}
