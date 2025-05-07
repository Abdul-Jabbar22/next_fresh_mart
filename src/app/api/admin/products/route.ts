// /app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenAndAdmin } from "@/lib/auth";
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

    const body: Product = await req.json();
    console.log("Product body:", body);

    if (!body.name || !body.price || !body.image) {
      return NextResponse.json({ error: "Missing product fields" }, { status: 400 });
    }

    const product = new Product(body);
    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/products error:", error.message || error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
