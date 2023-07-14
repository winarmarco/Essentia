import { Document, Schema, model } from "mongoose";

enum DiscountCodeStatus {
  ACTIVE = "Active",
  EXPIRED = "Expired",
}

interface IDiscountCode extends Document {
  discountCode: String,
  validStart: Date,
  validEnd: Date,
  discountAmount: Number,
  percentAmount: Boolean,
  maxDiscountDollar: Number,
  status: DiscountCodeStatus,
}

const DiscountCodeSchema: Schema<IDiscountCode> = new Schema({
  discountCode: {
    type: String,
    required: true,
  },
  validStart: {
    type: Date,
    required: true,
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
    enum: Object.values(DiscountCodeStatus),
    default: DiscountCodeStatus.ACTIVE,
  }
})


const DiscountCode = model<IDiscountCode>("DiscountCode", DiscountCodeSchema);

export default DiscountCode;
export type {IDiscountCode};


