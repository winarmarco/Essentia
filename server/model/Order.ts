import { Schema, model } from "mongoose";
import { IInvoice } from "./Invoice";
import { IUser } from "./User";

enum OrderStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}


interface IOrder {
  customer: IUser["_id"],
  invoice: IInvoice["_id"];
  dateOrdered: Date;
  dateCompleted: Date;
  status: OrderStatus;
}

const OrderSchema: Schema<IOrder> = new Schema({
  customer: {type: Schema.Types.ObjectId, ref: 'User'},
  invoice: {type: Schema.Types.ObjectId, ref: 'Invoice'},
  dateOrdered: {type: Date, required: true},
  dateCompleted: {type: Date},
  status: {type: String, enum: Object.values(OrderStatus)},
})


const Order = model<IOrder>("Order", OrderSchema);

export default Order;