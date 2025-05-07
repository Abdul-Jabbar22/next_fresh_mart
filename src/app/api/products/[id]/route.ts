// /app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenAndAdmin } from "@/lib/auth";
import { ProductType } from "@/types";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to get product" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const user = await verifyTokenAndAdmin(req );
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: Partial<ProductType> = await req.json();

    const updated = await Product.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const user = await verifyTokenAndAdmin(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
