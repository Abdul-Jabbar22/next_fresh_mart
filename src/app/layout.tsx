import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { CartProvider } from "./cart/context/CartContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col ">
      <CartProvider>
        <Navbar />
    
      <main className="flex-grow  bg-white">{children}</main>

    
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
