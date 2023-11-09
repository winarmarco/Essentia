import * as z from "zod";
import { CategorySchema } from "./category";

export const ProductSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  stockQuantity: z.number(),
  showOnLandingCarousel: z.boolean(),
  category: z.union([CategorySchema, z.string()]),
  newProduct: z.boolean(),
  description: z.string(),
  shortDescription: z.string(),
  images: z.array(z.string()),
})

export type IProduct = z.infer<typeof ProductSchema>
