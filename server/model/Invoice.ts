import { Document, Schema, model } from "mongoose";
import Cart, { ICart } from "./Cart";
import DiscountCode, { IDiscountCode } from "./DiscountCoupon";

interface IInvoice extends Document {
  cart: ICart["_id"],
  discountCode: IDiscountCode["_id"],
}

const InvoiceSchema: Schema<IInvoice> = new Schema({
  cart: {
    type: Cart,
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