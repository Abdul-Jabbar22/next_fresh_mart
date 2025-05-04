import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
