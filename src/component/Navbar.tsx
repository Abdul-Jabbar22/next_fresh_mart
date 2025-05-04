// components/Navbar.tsx
"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/cart/context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount } = useCart();

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md sticky top-0 z-50 m-r-2 m-l w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Mobile toggle button on left side */}
        <div className="w-full flex items-center justify-between md:justify-normal md:w-auto gap-4">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <div id="header-logo">
              <img
                src="/logo.png"
                alt="Fresh Basket Logo"
                className="h-10 w-auto"
              />
            </div>
            <span className="hidden sm:inline">Fresh Basket</span>
          </Link>

          {/* Mobile cart - appears right after logo on mobile */}
          <div className="md:hidden">
            <Link href="/cart" className="relative" aria-label="Cart">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1.5">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Box */}
        <div className="w-full flex flex-row md:max-w-md order-last md:order-none">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search fruits, vegetables..."
              className="w-full pr-10 pl-4 py-2 bg-white rounded-full text-black focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Desktop links and cart */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>

          <Link href="/cart" className="relative" aria-label="Cart">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1.5">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden w-full flex flex-col items-start gap-4 pt-4 border-t border-green-700">
            <Link
              href="/shop"
              className="hover:underline text-lg w-full py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
