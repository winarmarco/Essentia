import { Document, Schema, model } from "mongoose";
import Cart, { ICart } from "./Cart";
import  { IDiscountCoupon } from "./DiscountCoupon";

interface IInvoice extends Document {
  cart: ICart["_id"],
  discountCode: IDiscountCoupon["_id"],
}

const InvoiceSchema: Schema<IInvoice> = new Schema({
  cart: {
    type:Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  discountCode: {
    type: Schema.Types.ObjectId,
    ref: "DiscountCode",
  }
})

const Invoice = model("Invoice", InvoiceSchema);

export default Invoice;
export type {IInvoice};