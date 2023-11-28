import * as z from "zod";
import { CategorySchema } from "./category";

export const ProductSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Name is required"),
  price: z.string(),
  stockQuantity: z.string(),
  showOnLandingCarousel: z.boolean(),
  category: z.union([CategorySchema, z.string()]),
  newProduct: z.boolean(),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short Description is required"),
  images: z.array(z.string()),
})

export type IProduct = z.infer<typeof ProductSchema>
