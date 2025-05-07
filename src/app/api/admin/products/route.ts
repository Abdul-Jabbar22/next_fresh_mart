// /app/api/admin/products/route.ts
import { NextRequest, NextResponse } from "next/server";

import { verifyTokenAndAdmin } from "@/lib/auth";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";

// CREATE product (Admin)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const admin = await verifyTokenAndAdmin(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, description, price, imageUrl, category } = await req.json();

    const product = await Product.create({ name, description, price, imageUrl, category });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// GET all products (Admin)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const admin = await verifyTokenAndAdmin(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// UPDATE product (Admin)
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const admin = await verifyTokenAndAdmin(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId, updateData } = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE product (Admin)
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const admin = await verifyTokenAndAdmin(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return NextResponse.json({ message: "Product deleted", deletedProduct });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
