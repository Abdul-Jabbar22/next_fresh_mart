import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOrder extends Document {
  products: {
    productId: string;
    quantity: number;
  }[];
  total: number;
}

const orderSchema = new Schema<IOrder>(
  {
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
