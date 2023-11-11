import * as z from "zod";

export const ShippingAddressSchema = z.object({
  country: z.string().min(1, {message: "Country is required"}),
  streetAddress: z.string().min(1, {message: "Street Address is required"}),
  apartmentNumber: z.string().optional(),
  town: z.string().min(1, {message: "Town is required"}),
  state: z.string().min(1, {message: "State is required"}),
  zipCode: z.string().min(1, {message: "Zip code is required"}),
})

export type IShippingAddress = z.infer<typeof ShippingAddressSchema>;
