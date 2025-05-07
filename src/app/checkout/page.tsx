// /app/checkout/page.tsx
"use client";

import { useCart } from "@/app/context/CartContext";
import { CreditCardIcon, IdCardIcon, Lock, TruckIcon } from "lucide-react";
import { useState } from "react";
import { BiQuestionMark } from "react-icons/bi";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (!form.fullName || !form.address || !form.phone) {
      alert("Please fill all fields.");
      return;
    }

    // Simulate checkout logic
    alert("Order placed successfully!");
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = total * 0.6;
  const shipping_Charges = 120;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Secure Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TruckIcon className="w-5 h-5 mr-2 text-green-600" />
              Shipping Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City*
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code*
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCardIcon className="w-5 h-5 mr-2 text-green-600" />
              Payment Method
            </h2>

            <div className="space-y-4">
              <div className="flex items-center border rounded-lg p-4 hover:border-green-500 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  id="credit-card"
                  className="h-4 w-4 text-green-600"
                  defaultChecked
                />
                <label htmlFor="credit-card" className="ml-3 flex items-center">
                  <CreditCardIcon className="w-6 h-6 mr-2" />
                  <span>Credit/Debit Card</span>
                </label>
              </div>

              <div className="flex items-center border rounded-lg p-4 hover:border-green-500 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  id="paypal"
                  className="h-4 w-4 text-green-600"
                />
                <label htmlFor="paypal" className="ml-3 flex items-center">
                  <IdCardIcon className="w-6 h-6 mr-2" />
                  <span>PayPal</span>
                </label>
              </div>

              <div className="flex items-center border rounded-lg p-4 hover:border-green-500 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  id="cod"
                  className="h-4 w-4 text-green-600"
                />
                <label htmlFor="cod" className="ml-3 flex items-center">
                  <IdCardIcon className="w-6 h-6 mr-2" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Credit Card Form (shown when credit card selected) */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <CreditCardIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date*
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <BiQuestionMark className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold border-b pb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mt-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: 1</p>
                    </div>
                  </div>
                  <span className="font-medium">
                    Rs {item.price.toFixed(2)}
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
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">Rs {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
                <span>Total</span>
                <span>Rs {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-6 font-medium transition-colors"
            >
              Place Order
            </button>

            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Lock className="w-4 h-4 mr-1" />
              <span>Secure SSL encrypted payment</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium mb-2">Need help?</h3>
            <p className="text-sm text-gray-600 mb-2">
              Call us at +1 (555) 123-4567
            </p>
            <p className="text-sm text-gray-600">Email support@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
