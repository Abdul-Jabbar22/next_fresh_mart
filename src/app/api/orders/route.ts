import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const orderData = await req.json();
    const newOrder = await Order.create(orderData);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to place order. Check your data and try again." },
      { status: 500 }
    );
  }
}