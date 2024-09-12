import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  discount: {
    type: Number,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
});

const Product = model("Product", productSchema);

export default Product;
