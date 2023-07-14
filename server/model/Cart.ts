import { Document, Schema, model } from "mongoose";
import Product, { IProduct } from "./Product";

interface ICart extends Document {
  items: IProduct["_id"][],
}

const CartSchema: Schema<ICart> = new Schema({
  items: [{
    type: Schema.Types.ObjectId,
    ref: "Product",
  }]
})


const Cart = model<ICart>("Cart", CartSchema);

export default Cart;
export type {ICart};