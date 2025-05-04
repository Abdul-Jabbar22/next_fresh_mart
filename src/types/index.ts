// types/index.ts
export type Product = {
    _id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    // Add any other product properties you need
  };
  
  export type CartItem = Product & {
    quantity: number;
  };