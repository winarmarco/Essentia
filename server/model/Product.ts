import { Document, Schema, model } from "mongoose";
import Category, { ICategory } from "./Category"

interface IProduct extends Document {
  name: string,
  price: number,
  stockQuantity: number,
  showOnLandingCarousel: boolean,
  category: ICategory["_id"],
  newProduct: boolean,
  description: string,
  shortDescription: string,
  images: URL,
}

const ProductSchema: Schema<IProduct> = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  newProduct: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
  },
  images: [{
    type: URL,
    required: true,
  }]
})

const Product = model<IProduct>("Product", ProductSchema);

export default Product;

export type {IProduct};