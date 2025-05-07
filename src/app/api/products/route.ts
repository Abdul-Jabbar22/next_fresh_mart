// /app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenAndAdmin } from "@/lib/auth";
import { ProductType } from "@/types";
import Product from "@/lib/models/Product";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await verifyTokenAndAdmin(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: ProductType = await req.json();

    const product = new Product(body);
    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
