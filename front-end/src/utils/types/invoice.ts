import z from "zod";
import { ProductSchema } from "./products";
import { DiscountCouponSchema } from "./discountCoupon";

export const InvoiceSchema = z.object({
  items: z.array(z.object({
    item: z.object({
      name: z.string(),
      price: z.number(),
      images: z.array(z.string()),
    }),
    originalItem: ProductSchema,
    quantity: z.number(),
  })),
  discountCoupon: DiscountCouponSchema,
})


export type IInvoice = z.infer<typeof InvoiceSchema>;