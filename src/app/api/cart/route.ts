// /app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { CartItem } from "@/types";
import connectDB from "@/lib/db";
import Cart from "@/lib/models/Cart";

// GET cart for logged-in user
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded: any = verifyAccessToken(token!);
    const cart = await Cart.findOne({ userId: decoded.sub });
    return NextResponse.json(cart || { userId: decoded.sub, products: [] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

// ADD item to cart (POST)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded: any = verifyAccessToken(token!);
    const userId = decoded.sub;

    const { productId, quantity } = await req.json();

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.products.findIndex((p: any) => p.productId === productId);
      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      await cart.save();
    } else {
      cart = await Cart.create({ userId, products: [{ productId, quantity }] });
    }

    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

// UPDATE item quantity (PUT)
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded: any = verifyAccessToken(token!);
    const userId = decoded.sub;

    const { productId, quantity } = await req.json();

    const cart = await Cart.findOne({ userId });
    if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });

    const item = cart.products.find((p: any) => p.productId === productId);
    if (item) item.quantity = quantity;

    await cart.save();
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

// DELETE item from cart
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded: any = verifyAccessToken(token!);
    const userId = decoded.sub;

    const { productId } = await req.json();

    const cart = await Cart.findOne({ userId });
    if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });

    cart.products = cart.products.filter((p: any) => p.productId !== productId);

    await cart.save();
    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}
