import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  image?: string;
  price: number;
  category: mongoose.Types.ObjectId; // Reference to Category
  inStock: boolean;
}

const productSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    category: { 
      type: Schema.Types.ObjectId, 
      ref: "Category", // Reference to the Category model
      required: true 
    },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Check if model already exists to avoid OverwriteModelError
const Product: Model<IProduct> = 
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;