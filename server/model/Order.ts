import { Schema, model } from "mongoose";
import { IInvoice } from "./Invoice";
import { IUser } from "./User";
import { IShippingAddress } from "./ShippingAddress";

enum OrderStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}


interface IOrder {
  shippingAddress: IShippingAddress;
  invoice: IInvoice["_id"];
  dateOrdered: Date;
  dateCompleted: Date;
  status: OrderStatus;
}

const OrderSchema: Schema<IOrder> = new Schema({
  shippingAddress: {type: Schema.Types.ObjectId, ref: 'ShippingAddress', required: true},
  invoice: {type: Schema.Types.ObjectId, ref: 'Invoice'},
  dateOrdered: {type: Date, required: true},
  dateCompleted: {type: Date},
  status: {type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING},
})


const Order = model<IOrder>("Order", OrderSchema);

export default Order;