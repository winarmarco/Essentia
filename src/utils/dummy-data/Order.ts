import { OrderStatus } from "@/types/Order";
import { invoiceDummyData } from "./Invoice";
import dummyCustomerData from "./Customer";

const dummyOrder = {
  orderID : "123",
  customer : dummyCustomerData,
  DateOrdered : new Date(2022, 3, 26),
  invoice : invoiceDummyData,
  status : OrderStatus.Pending,
}

export default dummyOrder;