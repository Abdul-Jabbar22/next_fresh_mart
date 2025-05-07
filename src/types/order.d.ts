export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: string;
    paymentStatus: string;
    status: string;
  }
  