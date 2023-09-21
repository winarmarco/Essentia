import { OrderStatus, OrderSummary } from "@/utils/types/Order";
import { invoiceDummyData } from "./Invoice";
import { calculateTotal } from "../functions/Invoice";

const recentOrderDummyData: OrderSummary[] = [
  {
    orderID: "123",
    DateOrdered: new Date(2024, 3, 15),
    firstName: "John",
    lastName: "Doe",
    total: calculateTotal(invoiceDummyData),
    status: OrderStatus.Completed,
  },
  {
    orderID: "124",
    DateOrdered: new Date(2022, 4, 26),
    firstName: "John",
    lastName: "Doe",
    total: calculateTotal(invoiceDummyData),
    status: OrderStatus.Completed,
  },
  {
    orderID: "125",
    DateOrdered: new Date(2025, 4, 26),
    firstName: "John",
    lastName: "Doe",
    total: calculateTotal(invoiceDummyData),
    status: OrderStatus.Completed,
  }



  // More rows...
];

export {recentOrderDummyData};