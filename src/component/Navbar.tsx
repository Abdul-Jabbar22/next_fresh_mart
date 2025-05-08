// /components/Navbar.tsx
"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search, User2, Store } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount } = useCart();
  const handleLogout = async () => {
    try {
      // Call your logout API
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear client-side state and redirect
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Top Row */}
        <div className="w-full flex items-center justify-between md:w-auto gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -ml-2"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <img
              src="/logo.png"
              alt="Fresh Mart Logo"
              className="h-10 w-auto"
            />
            <span className="hidden sm:inline">Fresh Mart</span>
          </Link>

          <Link href="/cart" className="md:hidden relative">
            <ShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1.5">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Search */}
        <div className="w-full md:max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pr-10 pl-4 py-2 bg-white rounded-full text-black"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group inline-block">
            <Link href="/shop">
              <Store className="hover:text-green-300" />
            </Link>
            <span className="absolute top-full left-1/2 mt-1 px-2 py-1 text-xs text-gray-500 bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
    Go to Shop
  </span>
          </div>
          <div className="relative group">
            <button className="flex items-center hover:underline">
              <User2 />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all">
              <Link
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                Register
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
              >
                <button>
                  <span onClick={handleLogout}>Logout</span>
                </button>
              </Link>
            </div>
          </div>
          <Link href="/cart" className="relative">
            <ShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1.5">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden w-full flex flex-col items-start gap-4 pt-4 border-t border-green-700">
            <div className="relative group inline-block">
            <Link href="/shop">
              <Store className="hover:text-green-300" />
            </Link>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-green-500 rounded opacity-0 group-hover:opacity-100 transition-opacity">
           Shop Now
            </span>
          </div>

            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
