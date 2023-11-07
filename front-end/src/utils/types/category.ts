import z from "zod";

export const CategorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  categoryKey: z.string(),
})

export type ICategory = z.infer<typeof CategorySchema>;