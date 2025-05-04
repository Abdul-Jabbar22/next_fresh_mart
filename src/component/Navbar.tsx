import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold text-xl">Fresh Basket</Link>
        <div className="space-x-4">
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
}
