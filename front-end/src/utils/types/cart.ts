import { z } from "zod";
import { ProductSchema } from "./products";

export const CartSchema = z.object({
  items: z.array(z.object({
    item: ProductSchema,
    quantity: z.number(),
  }))
})

export type ICart = z.infer<typeof CartSchema>;

