// app/cart/page.tsx
"use client";

import Link from "next/link";
import { useCart } from "./context/CartContext";

export default function CartPage() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    cartItemCount 
  } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart ({cartItemCount})</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <Link href="/shop" className="text-green-600 hover:underline mt-4 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div key={item._id} className="border-b py-4 flex justify-between">
                <div className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-black">{item.name}</h3>
                    <p className="text-gray-600">Rs{item.price.toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 text-sm mt-1"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-2 bg-gray-200 rounded text-black"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-black">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-2 bg-gray-200 rounded text-black"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-500">Rs{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Shipping</span>
              <span className="text-gray-500">Free</span>
            </div>
            <div className="border-t pt-4 mt-4 flex justify-between font-bold">
              <span className="text-black">Total</span>
              <span className="text-black">Rs{totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className="w-full bg-green-500 text-white py-3 rounded-md mt-6 hover:bg-green-600"
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}