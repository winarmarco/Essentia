import * as z from "zod";
import { ShippingAddressSchema } from "./shippingAddress";
import { InvoiceSchema } from "./Invoice";
import { UserSchema } from "./user";

export const OrderSchema = z.object({
  _id: z.string(),
  shippingAddress: ShippingAddressSchema,
  invoice: InvoiceSchema,
  dateOrdered: z.date(),
  dateCompleted: z.date(),
  status: z.enum(["Pending", "Completed", "Cancelled"])
}).merge(UserSchema.pick({ email: true, firstName: true, lastName: true }));


export type IOrder = z.infer<typeof OrderSchema>;

