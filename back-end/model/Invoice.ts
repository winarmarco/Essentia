import { Document, Schema, model } from "mongoose";
import Cart, { ICart, ICartItem } from "./Cart";
import  { IDiscountCoupon } from "./DiscountCoupon";
import { IProduct } from "./Product";

export interface IInvoiceItemProduct {
  item: {
    name: string,
    price: number,
    images: string[]
  },
  originalItem: IProduct["_id"],
  quantity: number,
}

interface IInvoice extends Document {
  items: [IInvoiceItemProduct],
  discountCoupon: IDiscountCoupon["_id"],
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
  discountCoupon: {
    type: Schema.Types.ObjectId,
    ref: "DiscountCode",
  }
})

const Invoice = model("Invoice", InvoiceSchema);

export default Invoice;
export type {IInvoice};