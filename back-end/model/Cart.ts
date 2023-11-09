import { Document, PopulatedDoc, Schema, model } from "mongoose";
import Product, { IProduct } from "./Product";

export interface ICartItem {
  item: PopulatedDoc<IProduct & Document>;
  quantity: number;
}

interface ICart extends Document {
  items: ICartItem[],
  calculateTotalPrice: () => Promise<Number>;
}

const CartSchema: Schema<ICart> = new Schema({
  items: [{
    item: {    
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 0,
    }
  }]
})

CartSchema.methods.calculateTotalPrice = async function(this: ICart) {
  let totalPrice = 0;
  const populatedCart = await this.populate({path: "items", populate: "item"});

  for (const cartItem of populatedCart.items) {
    const product = cartItem;
    if (product) {

      totalPrice += product.item.price * product.quantity;
    }
  }

  return totalPrice;
}

const Cart = model<ICart>("Cart", CartSchema);

export default Cart;
export type {ICart};