// /components/ProductCard.tsx
"use client";

import { useCart } from "@/app/context/CartContext";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="transform scale-95 border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-black">{product.name}</h3>
        <p className="text-gray-600">Rs{product?.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}