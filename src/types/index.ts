// /types/index.ts
export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}
export type ProductType = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  total: number;
  page:number;
  limit:number;
  skip:number;
  totalPages:number
};
export type CartProduct = {
  productId: string;
  quantity: number;
};

export type CartItem = {
  price: any;
  quantity: number;
  image: string | Blob | undefined;
  name: string | undefined;
  _id?: string;
  userId: string;
  products: CartProduct[];
  createdAt?: string;
  updatedAt?: string;
};
export type OrderProduct = {
  productId: string;
  quantity: number;
};

export type OrderType = {
  _id?: string;
  userId: string;
  products: OrderProduct[];
  total: number;
  status?: "pending" | "processing" | "shipped" | "delivered";
  createdAt?: string;
  updatedAt?: string;
};