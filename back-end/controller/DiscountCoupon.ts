import { NextFunction, Request, Response } from "express";
import DiscountCoupon, { IDiscountCouponStatus } from "../model/DiscountCoupon";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import { BadRequestError } from "../utils/Errors/ValidationError";
import { validationResult } from "express-validator";
import { AuthenticatedRequest } from "../utils/middleware/Authentication";
import User from "../model/User";


// Get an existing coupon
// Authorization: *
// method: GET
// path: /discount-coupon
// body: -
// return: {data:  {discountCoupon: DiscountCoupon}}
export const getDiscountCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.params;
  const userId = (req as AuthenticatedRequest).token;
  
  try {

    const user = await User.findById(userId).populate({path: "cart"});

    if (!user) throw new NotFoundError("User not found!");
    
    const discountCode = code;
    const discountCoupon = await DiscountCoupon.findOne({discountCode: discountCode});

    if (!discountCoupon) throw new NotFoundError("Discount Coupon not found");

    await discountCoupon.validateCoupon(user.cart);
    const discountDollarAmount = await discountCoupon.applyCoupon(user.cart);

    const {percentAmount, discountAmount, maxDiscountDollar} = discountCoupon;
    return res.status(200).json({data: {
      discountCoupon: {
        discountCode,
        percentAmount,
        discountAmount,
        maxDiscountDollar,
      },
      discountDollarAmount,
    }});

  } catch (error) {
    next(error);
  }
}


// Create a new coupon
// Authorization: ADMIN
// method: POST
// path: /discount-coupon
// body: {discountCoupon: {discountCode; String. discountAmount: number}}
// return: {data: {discountCoupon: DiscountCoupon}};
export const createDiscountCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const newDiscountCoupon = new DiscountCoupon(req.body.discountCoupon);
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) throw new BadRequestError(JSON.stringify(validationErrors));

    const discountCoupon = await newDiscountCoupon.save();

    return res.status(201).json({data: {discountCoupon}});
  } catch (error) {
    next(error);
  }
}

// Update a discount coupon
// Authorization: ADMIN
// method: POST
// path: /discount-coupon/<discountCouponId>
// body: {discountCoupon?: {discountCode; String. discountAmount?: number}}
// return: {data: {discountCoupon: DiscountCoupon}} <- newly updated discountCoupon
export const updateDiscountCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const { couponId } = req.params;

  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) throw new BadRequestError(JSON.stringify(validationErrors));

    const updatedFields = req.body.discountCoupon;

    const updatedDiscountCoupon = await DiscountCoupon.findByIdAndUpdate(couponId, {$set : updatedFields}, { new: true })

    if (!updatedDiscountCoupon) throw new NotFoundError(`Discount Coupon with id ${couponId} not found`);

    return res.status(201).json({data: {discountCoupon: updatedDiscountCoupon}});
  } catch (error) {
    next(error);
  }
}