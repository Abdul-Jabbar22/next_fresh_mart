// /app/api/admin/orders/route.ts
import { NextRequest, NextResponse } from "next/server";

import { verifyTokenAndAdmin } from "@/lib/auth";
import connectDB from "@/lib/db";
import Order from "@/lib/models/Order";

// GET all orders (Admin)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const isAdmin = await verifyTokenAndAdmin(req);
    if (isAdmin === false) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const orders = await Order.find();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// UPDATE order status (Admin)
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const admin = await verifyTokenAndAdmin(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { orderId, status } = await req.json();
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}
