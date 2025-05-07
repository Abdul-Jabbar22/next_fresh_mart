import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description?: string;
  image?: string;
  price: number;
  category: string;
  inStock: boolean;
}

const productSchema: Schema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
