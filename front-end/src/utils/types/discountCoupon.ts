import z from "zod";

export const DiscountCouponSchema = z.object({
  discountCode: z.string(),
  validStart: z.date(),
  validEnd: z.date(),
  discountAmount: z.number(),
  percentAmount: z.boolean(),
  maxDiscountDollar: z.number().optional(),
  status: z.enum(["Active", "Expired"]),
});

export const DiscountCouponClientSchema = DiscountCouponSchema.pick({
  discountCode: true,
  discountAmount: true,
  percentAmount: true,
  maxDiscountDollar: true,
});

export type IDiscountCouponClient = z.infer<typeof DiscountCouponClientSchema>;
export type IDiscountCoupon = z.infer<typeof DiscountCouponSchema>;
