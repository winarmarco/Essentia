import { Document, Schema, model } from "mongoose";

enum IDiscountCouponStatus {
  ACTIVE = "Active",
  EXPIRED = "Expired",
}

interface IDiscountCoupon extends Document {
  discountCode: String,
  validStart: Date,
  validEnd: Date,
  discountAmount: Number,
  percentAmount: Boolean,
  maxDiscountDollar: Number,
  status: IDiscountCouponStatus,
}

const DiscountCouponSchema: Schema<IDiscountCoupon> = new Schema({
  discountCode: {
    type: String,
    required: true,
  },
  validStart: {
    type: Date,
    default: new Date(),
  },
  validEnd: {
    type: Date,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  percentAmount: {
    type: Boolean,
    default: false,
  },
  maxDiscountDollar: {
    type: Number,
  },
  status: {
    type: String,
    enum: Object.values(IDiscountCouponStatus),
    default: IDiscountCouponStatus.ACTIVE,
  }
})


const DiscountCoupon = model<IDiscountCoupon>("DiscountCoupon", DiscountCouponSchema);

export default DiscountCoupon;
export type {IDiscountCoupon};


