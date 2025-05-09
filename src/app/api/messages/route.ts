// app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Message } from "@/lib/models/Messages"; // Adjust import path as needed

// POST - Create a new message
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({ name, email, message });
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) { // Duplicate email error
      return NextResponse.json(
        { error: "A message with this email already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create message", details: error.message },
      { status: 500 }
    );
  }
}

// GET - Retrieve all messages
export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 }); // Newest first
    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch messages", details: error.message },
      { status: 500 }
    );
  }
}

