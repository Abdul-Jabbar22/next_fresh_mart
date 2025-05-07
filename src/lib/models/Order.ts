// /models/Order.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  total: number;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
