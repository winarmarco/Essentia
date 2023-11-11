import { Document, PopulatedDoc, Schema, model, mongo } from "mongoose";
import Product, { IProduct } from "./Product";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import { BadRequestError } from "../utils/Errors/ValidationError";

export interface ICartItem {
  item: PopulatedDoc<IProduct & Document>;
  quantity: number;
}

interface ICart extends Document {
  items: ICartItem[],
  calculateTotalPrice: () => Promise<Number>;
  checkAvailability: () => void;
  checkout: (session: mongo.ClientSession) => Promise<void>;
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

CartSchema.methods.checkAvailability = async function(this: ICart) {

  const populatedCart = await this.populate({path: "items", populate: "item"});
  const unavailableProduct: any[] = [];

  for (const cartItem of populatedCart.items) {
    const product = cartItem;
    if (product) {
      const itemId = product.item._id;
      const demandedQuantity = product.quantity;
      const productInventory = await Product.findById(itemId);

      if (!productInventory)  throw new NotFoundError("Product not found");

      if (productInventory.stockQuantity < demandedQuantity) {
        unavailableProduct.push({
          id: itemId,
          demandedQuantity,
          availableQUantity: productInventory.stockQuantity,
        });
      } 
    }
  }

  if (unavailableProduct.length > 0) {
    throw new BadRequestError("Some products are out of stock", unavailableProduct);
  }
}

CartSchema.methods.checkout = async function(this: ICart, session?: mongo.ClientSession) {

  const populatedCart = await this.populate({path: "items", populate: "item"});
  const unavailableProduct: any[] = [];


  for (const cartItem of populatedCart.items) {
    const product = cartItem;
    if (product) {
      const itemId = product.item._id;
      const demandedQuantity = product.quantity;
      const productInventory = await Product.findById(itemId);

      if (!productInventory)  throw new NotFoundError("Product not found");

      if (productInventory.stockQuantity >= demandedQuantity) {
        productInventory.stockQuantity -= demandedQuantity;
        await productInventory.save({session});
      } else {
        unavailableProduct.push({
          id: itemId,
          demandedQuantity,
          availableQUantity: productInventory.stockQuantity,
        });
      }
    }
  }

  if (unavailableProduct.length > 0) {
    throw new BadRequestError("Some products are out of stock", unavailableProduct);
  }
}

const Cart = model<ICart>("Cart", CartSchema);

export default Cart;
export type {ICart};