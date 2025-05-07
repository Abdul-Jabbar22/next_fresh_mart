// /app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenAndAdmin } from "@/lib/auth";
import type { ProductType } from "@/types";
import Product from "@/lib/models/Product";
import connectDB from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    const total = await Product.countDocuments();
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .lean(); // Convert to plain JavaScript objects
    
    return NextResponse.json({
      data: products, // Explicitly name the array as 'data'
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await verifyTokenAndAdmin(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: ProductType = await req.json();

    const product = new Product(body);
    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
