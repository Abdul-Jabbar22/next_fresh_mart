// /app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Cart from "@/lib/models/Cart";

// Helper function to get or create cart
async function getCart(userId: string) {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, products: [] });
  }
  return cart;
}

// GET cart for user
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = req.nextUrl.searchParams.get("userId") || "guest";
    const cart = await getCart(userId);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

// ADD or UPDATE item in cart (POST)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, productId, quantity } = await req.json();
    const cart = await getCart(userId || "guest");

    const itemIndex = cart.products.findIndex((p: any) => p.productId === productId);
    
    if (itemIndex > -1) {
      // Update existing item
      cart.products[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

// DELETE item from cart
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { userId, productId } = await req.json();
    const cart = await getCart(userId || "guest");

    cart.products = cart.products.filter((p: any) => p.productId !== productId);
    await cart.save();
    
    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}