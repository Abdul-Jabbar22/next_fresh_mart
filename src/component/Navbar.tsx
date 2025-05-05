"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search, User2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/app/cart/context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { cartItemCount } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Mobile toggle button on left side */}
        <div className="w-full flex items-center justify-between md:justify-normal md:w-auto gap-4">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <div id="header-logo">
              <img src="/logo.png" alt="Fresh Mart Logo" className="h-10 w-auto" />
            </div>
            <span className="hidden sm:inline">Fresh Mart</span>
          </Link>

          {/* Mobile cart */}
          <div className="md:hidden flex items-center gap-4">
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

          {/* User dropdown - persistent until selection or outside click */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-1 hover:underline"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              aria-label="User menu"
              aria-expanded={isUserDropdownOpen}
            >
              <User2 className="w-6 h-6 text-white" />
            </button>
            
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

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
            
            <div className="w-full">
              <button
                className="flex items-center gap-2 text-lg w-full py-2"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <User2 className="w-6 h-6" />
                <span>Account</span>
              </button>
              
              {isUserDropdownOpen && (
                <div className="pl-6 mt-2 space-y-3">
                  <Link
                    href="/login"
                    className="block hover:underline"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsUserDropdownOpen(false);
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block hover:underline"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsUserDropdownOpen(false);
                    }}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}