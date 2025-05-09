"use client";

import { useCart } from "@/app/context/CartContext";
import { Lock, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart(); // Assuming user is available in your CartContext
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }


    setIsProcessing(true);
    
    try {
      const orderData = {
        products: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity || 1
        })),
        total: total + tax + shippingCharges
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      if (!res.ok) {
        throw new Error("Failed to place order");
      }
  
      const result = await res.json();
      console.log("Order success:", result);
  
      // Show success modal and clear cart
      setShowSuccessModal(true);
      clearCart();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const tax = total * 0.2;
  const shippingCharges = 120;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-8">
        Secure Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold border-b pb-4 text-gray-700">
              Order Summary
            </h2>

            <div className="space-y-4 mt-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center text-gray-700"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-medium">
                    Rs {(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Rs {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Rs {shippingCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">Rs {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
                <span>Total</span>
                <span>Rs {(total + tax + shippingCharges).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing || cart.length === 0}
              className={`w-full ${isProcessing || cart.length === 0 ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white py-3 rounded-lg mt-6 font-medium transition-colors`}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>

            <div className="mt-4 flex items-center text-sm text-gray-600">
              <Lock className="w-4 h-4 mr-1" />
              <span>Secure SSL encrypted payment</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium mb-2 text-gray-700">Need help?</h3>
            <p className="text-sm text-gray-600 mb-2">
              Call us at +92 3017376974
            </p>
            <p className="text-sm text-gray-600">Email support@example.com</p>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-emerald-600">Order Placed Successfully!</h2>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              Thank you for your order. Your order number is #{Math.floor(Math.random() * 1000000)}. 
              We've sent a confirmation email with your order details.
            </p>
            <Link
              href='/shop'
              className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}