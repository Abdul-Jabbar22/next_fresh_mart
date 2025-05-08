// /models/Cart.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICart extends Document {
    userId: Types.ObjectId; // Reference to User model
  products: {
    productId: string;
    quantity: number;
  }[];
}

const cartSchema: Schema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", cartSchema);
