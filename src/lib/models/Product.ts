import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  image?: string;
  price: number;
  stock: boolean;
}

const productSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    stock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Check if model already exists to avoid OverwriteModelError
const Product: Model<IProduct> = 
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;