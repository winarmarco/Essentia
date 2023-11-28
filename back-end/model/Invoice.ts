import { Document, PopulatedDoc, Schema, model } from "mongoose";
import Cart, { ICart, ICartItem } from "./Cart";
import  { IDiscountCoupon } from "./DiscountCoupon";
import { IProduct } from "./Product";

export interface IInvoiceItemProduct {
  item: {
    name: string,
    price: number,
    images: string[]
  },
  originalItem: PopulatedDoc<IProduct & Document>,
  quantity: number,
}

interface IInvoice extends Document {
  items: [IInvoiceItemProduct],
  cart: PopulatedDoc<ICart & Document>;
  discountCoupon: PopulatedDoc<IDiscountCoupon & Document>,
  calculateTotalPrice: () =>  Promise<number>;
}

const InvoiceSchema: Schema<IInvoice> = new Schema({
  items: [
    { 
      item: {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        images: [{
          type: String,
          required: true,
        }],
      },
      originalItem: {    
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 0,
      }
    },
  ],
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  discountCoupon: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "DiscountCoupon",
  }
})

InvoiceSchema.methods.calculateTotalPrice = async function (this: IInvoice) {
  let total = 0;

  await this.populate([{
    path: "items",
  },])

  for (const invoiceItem of this.items) {
    const {item, quantity} = invoiceItem;
    total += item.price * quantity;
  } 

  return total;
}

const Invoice = model("Invoice", InvoiceSchema);

export default Invoice;
export type {IInvoice};