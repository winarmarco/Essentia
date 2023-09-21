import { Schema, model } from "mongoose";
import { IInvoice } from "./Invoice";
import { IUser } from "./User";
import { IShippingAddress } from "./ShippingAddress";

export enum OrderStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

interface IOrder {
  shippingAddress: IShippingAddress["_id"];
  invoice: IInvoice["_id"];
  email: IUser["email"];
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
  dateOrdered: Date;
  dateCompleted: Date;
  status: OrderStatus;
}

const OrderSchema: Schema<IOrder> = new Schema({
  shippingAddress: {type: Schema.Types.ObjectId, ref: 'ShippingAddress', required: true},
  invoice: {type: Schema.Types.ObjectId, ref: 'Invoice'},
  email: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOrdered: {type: Date, default: new Date()},
  dateCompleted: {type: Date},
  status: {type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING},
})


const Order = model<IOrder>("Order", OrderSchema);

export default Order;