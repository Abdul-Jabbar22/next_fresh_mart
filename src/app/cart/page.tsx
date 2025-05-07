// /app/cart/page.tsx
"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="flex-col text-gray-600">
          <p> Your cart is empty.</p>

          <button className="  text-green-500  hover:text-green-700 hover:underline">
            <Link href="/shop">Continue Shopping</Link>
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between bg-white p-4 shadow-md rounded-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-black">
                      {item.name}
                    </h2>
                    <h6 className="font-semibold text-sm text-gray-500">
                      {item.description}
                    </h6>
                    <p className="text-gray-600">Rs {item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold text-black">
              Total: Rs {total.toFixed(2)}
            </p>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
              <Link href="/checkout">Checkout</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
