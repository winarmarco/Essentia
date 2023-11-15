import { z } from "zod";
import { ShippingAddressSchema } from "./shippingAddress";

export const UserSchema=  z.object({
  _id: z.string(),
  firstName: z.string().min(1, {message: "First name is required"}),
  lastName: z.string().min(1, {message: "Last name is required"}),
  email: z.string().min(1, {message: "Email is required"}).email({message: "Invalid email"}),
  address: ShippingAddressSchema,
  phoneNumber: z.string().min(1, {message: "Phone number is required"}),
})

export type IUser = z.infer<typeof UserSchema>;