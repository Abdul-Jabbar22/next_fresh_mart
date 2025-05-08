import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col ">
        <AuthProvider>
          <CartProvider>
            <Navbar />

            <main className="flex-grow  bg-white">{children}</main>
            <Toaster position="top-right" />

            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
