// app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Message } from "@/lib/models/Messages"; // Adjust import path as needed



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

