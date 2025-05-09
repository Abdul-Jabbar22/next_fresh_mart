// /app/context/CartContext.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { ProductType } from "@/types";

interface CartContextType {
  cart: ProductType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void; 
  cartItemCount: number;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<ProductType[]>([]);

  const addToCart = (product: ProductType) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };
  const clearCart = () => {
    setCart([]);
  };
  

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartItemCount: cart.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};