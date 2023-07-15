import { Document, Schema, model } from "mongoose";
import Product, { IProduct } from "./Product";

interface ICart extends Document {
  items: {
    item: IProduct["_id"][],
    quantity: number;
  }[],
}

const CartSchema: Schema<ICart> = new Schema({
  items: [{
    item: {    type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 0,
    }
  }]
})


const Cart = model<ICart>("Cart", CartSchema);

export default Cart;
export type {ICart};