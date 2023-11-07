import { CustomerType } from "./Customer";
import InvoiceType from "./Invoice";
import ShoppingCartType from "./ShoppingCart";

enum OrderStatus {
  Pending = "Pending",
  Completed = "Completed",
  Canelled = "Cancelled",
}

type Order = {
  orderID: string;
  DateOrdered: Date;
  DateCompleted?: Date;
  customer: CustomerType;
  invoice: InvoiceType;
  status: OrderStatus;
}

type OrderSummary = {
  orderID: string;
  DateOrdered: Date;
  firstName: CustomerType["first-name"];
  lastName: CustomerType["last-name"];
  total: number;
  status: OrderStatus;
}


export {OrderStatus};
export type {Order, OrderSummary};
