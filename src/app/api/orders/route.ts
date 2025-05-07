// /app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";

import { verifyAccessToken, verifyTokenAndAdmin } from "@/lib/auth";
import { OrderType } from "@/types";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";

// User: Place order
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded: any = verifyAccessToken(token!);
    const userId = decoded.sub;

    const body: OrderType = await req.json();
    const newOrder = await Order.create({ ...body, userId });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}

// User: Get their orders, Admin: Get all orders
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded: any = verifyAccessToken(token!);

    const isAdmin = decoded.role === "admin";
    const orders = isAdmin
      ? await Order.find()
      : await Order.find({ userId: decoded.sub });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// Admin: Update order status
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const admin = await verifyTokenAndAdmin(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { orderId, status } = await req.json();

    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
