import mongoose, { Schema, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Fruit', 'Vegetable'], required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String }
}, {
  timestamps: true
});

export const Product = models.Product || mongoose.model('Product', ProductSchema);
