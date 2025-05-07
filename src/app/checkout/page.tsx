"use client";

import { useCart } from "@/app/context/CartContext";
import { CreditCardIcon, IdCardIcon, Lock, TruckIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BiQuestionMark } from "react-icons/bi";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      'firstName', 'lastName', 'address', 'city', 'postalCode', 'phone'
    ];
    
    if (paymentMethod === 'credit-card') {
      requiredFields.push('cardNumber', 'expiryDate', 'cvv');
    }

    requiredFields.forEach(field => {
      if (!form[field as keyof typeof form]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Validate phone number format
    if (form.phone && !/^\d{10,15}$/.test(form.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    // Validate postal code
    if (form.postalCode && !/^\d+$/.test(form.postalCode)) {
      newErrors.postalCode = 'Invalid postal code';
    }

    // Validate card details if credit card selected
    if (paymentMethod === 'credit-card') {
      if (form.cardNumber && !/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number';
      }
      if (form.expiryDate && !/^\d{2}\/\d{2}$/.test(form.expiryDate)) {
        newErrors.expiryDate = 'Invalid format (MM/YY)';
      }
      if (form.cvv && !/^\d{3,4}$/.test(form.cvv)) {
        newErrors.cvv = 'Invalid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;
  
    const orderData = {
      customer: {
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        phone: form.phone,
      },
      payment: {
        method: paymentMethod,
        cardNumber: form.cardNumber,
        expiryDate: form.expiryDate,
        cvv: form.cvv,
      },
      items: cart,
      totalAmount: total + tax + shippingCharges,
    };
  
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
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
    }
  };
  
  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setForm({ ...form, cardNumber: formattedValue });
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = total * 0.2;
  const shippingCharges = 120;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-8">
        Secure Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
              <TruckIcon className="w-5 h-5 mr-2 text-emerald-500" />
              Shipping Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  required
                  className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  required
                  className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  required
                  className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  City*
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  required
                  className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-200'} rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Postal Code*
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleInputChange}
                  required
                  className={`w-full border ${errors.postalCode ? 'border-red-500' : 'border-gray-200'} rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                />
                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  required
                  className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
              <CreditCardIcon className="w-5 h-5 mr-2 text-emerald-500" />
              Payment Method
            </h2>

            <div className="space-y-3">
              <div 
                className={`flex items-center border ${paymentMethod === 'credit-card' ? 'border-emerald-500' : 'border-gray-200'} rounded-md p-4 hover:border-emerald-400 cursor-pointer transition-colors`}
                onClick={() => setPaymentMethod('credit-card')}
              >
                <input
                  type="radio"
                  name="payment"
                  id="credit-card"
                  className="h-4 w-4 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                  checked={paymentMethod === 'credit-card'}
                  onChange={() => setPaymentMethod('credit-card')}
                />
                <label htmlFor="credit-card" className="ml-3 flex items-center text-gray-700">
                  <CreditCardIcon className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Credit/Debit Card</span>
                </label>
              </div>

              <div 
                className={`flex items-center border ${paymentMethod === 'paypal' ? 'border-emerald-500' : 'border-gray-200'} rounded-md p-4 hover:border-emerald-400 cursor-pointer transition-colors`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <input
                  type="radio"
                  name="payment"
                  id="paypal"
                  className="h-4 w-4 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                <label htmlFor="paypal" className="ml-3 flex items-center text-gray-700">
                  <IdCardIcon className="w-5 h-5 mr-2 text-gray-500" />
                  <span>PayPal</span>
                </label>
              </div>

              <div 
                className={`flex items-center border ${paymentMethod === 'cod' ? 'border-emerald-500' : 'border-gray-200'} rounded-md p-4 hover:border-emerald-400 cursor-pointer transition-colors`}
                onClick={() => setPaymentMethod('cod')}
              >
                <input
                  type="radio"
                  name="payment"
                  id="cod"
                  className="h-4 w-4 text-emerald-500 border-gray-300 focus:ring-emerald-500"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <label htmlFor="cod" className="ml-3 flex items-center text-gray-700">
                  <IdCardIcon className="w-5 h-5 mr-2 text-gray-500" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Credit Card Form (shown when credit card selected) */}
            {paymentMethod === 'credit-card' && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Card Number*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full border ${errors.cardNumber ? 'border-red-500' : 'border-gray-200'} rounded-md px-4 py-2.5 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                    />
                    <CreditCardIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Expiry Date*
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={form.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`w-full border ${errors.expiryDate ? 'border-red-500' : 'border-gray-200'} rounded-md px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                    />
                    {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      CVV*
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className={`w-full border ${errors.cvv ? 'border-red-500' : 'border-gray-200'} rounded-md px-4 py-2.5 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors`}
                      />
                      <BiQuestionMark className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
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
                      <p className="text-sm text-gray-600">Qty: 1</p>
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
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg mt-6 font-medium transition-colors"
            >
              Place Order
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
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition-colors"
            >
              <Link
              href='/shop'>
              Continue Shopping
              
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}