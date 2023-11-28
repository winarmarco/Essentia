import { Document, Schema, model } from "mongoose";
import { BadRequestError } from "../utils/Errors/ValidationError";
import Cart, { ICart } from "./Cart";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import { IInvoice } from "./Invoice";

export enum IDiscountCouponStatus {
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
  minDollarSpent: Number,
  status: IDiscountCouponStatus,
  usageTotal: Number,
  maxUser: Number,
  validateCoupon: (cart: ICart) => Promise<IDiscountCoupon>;
  applyCoupon: (cart: ICart) => Promise<number>;
  applyCouponInvoice: (invoice: IInvoice) => Promise<number>;
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
  minDollarSpent: {
    type: Number,
    default: 0,
  },
  maxDiscountDollar: {
    type: Number,
  },
  status: {
    type: String,
    enum: Object.values(IDiscountCouponStatus),
    default: IDiscountCouponStatus.ACTIVE,
  },
  usageTotal: {
    type: Number,
    default: 0,
  },
  maxUser: {
    type: Number,
    required: true,
  }
})

DiscountCouponSchema.methods.validateCoupon = async function (this: IDiscountCoupon, cart: ICart) {
  
  if (this.status != IDiscountCouponStatus.ACTIVE) {
    throw new BadRequestError(`Coupon with code ${this.discountCode} is expired`);
  }
  
  const currDate = new Date();
  if (!(this.validStart <= currDate)) {
    throw new NotFoundError(`No coupon found with that id`);
  }

  if (this.validEnd && currDate > this.validEnd) {
    throw new BadRequestError(`Coupon with code ${this.discountCode} is expired`);
  }


  const totalPrice = await cart.calculateTotalPrice();
  if (totalPrice < this.minDollarSpent) {
    throw new BadRequestError(`Coupon with code ${this.discountCode}, needs at least $${this.minDollarSpent} spent`);
  }

  if ((this.usageTotal.valueOf() + 1) > this.maxUser.valueOf()) {
    throw new BadRequestError(`Coupon with code ${this.discountCode} has reached its maximum usage limit`);
  }

  return this;
}

DiscountCouponSchema.methods.applyCoupon = async function(this: IDiscountCoupon, cart:  ICart) {
  await this.validateCoupon(cart);

  const totalPrice = await cart.calculateTotalPrice();

  const discountDollarAmount = (this.percentAmount) ? (this.discountAmount.valueOf() / 100 * totalPrice.valueOf()) : (this.discountAmount.valueOf());
  const maxDiscountDollarAmount = (this.maxDiscountDollar) || Infinity;

  return Math.min(discountDollarAmount, maxDiscountDollarAmount.valueOf());
}

DiscountCouponSchema.methods.applyCouponInvoice = async function(this: IDiscountCoupon, invoice: IInvoice) {

  const totalPrice = await invoice.calculateTotalPrice();

  const discountDollarAmount = (this.percentAmount) ? (this.discountAmount.valueOf() / 100 * totalPrice.valueOf()) : (this.discountAmount.valueOf());
  const maxDiscountDollarAmount = (this.maxDiscountDollar) || Infinity;


  return Math.min(discountDollarAmount, maxDiscountDollarAmount.valueOf());
}



const DiscountCoupon = model<IDiscountCoupon>("DiscountCoupon", DiscountCouponSchema);

export default DiscountCoupon;
export type {IDiscountCoupon};


