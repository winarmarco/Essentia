import { NextFunction, Request, Response } from "express";
import DiscountCoupon from "../model/DiscountCoupon";

export const getDiscountCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const { discountCode } = req.body.discountCoupon;
  console.log(discountCode)
  try {
    const discountCoupon = await DiscountCoupon.findOne({discountCode});

    if (!discountCoupon) throw new Error("Not found");

    // validate discountCoupon

    // if auth == user, return IDiscountCouponClient
    const {percentAmount, discountAmount, maxDiscountDollar} = discountCoupon;
    res.json({
      discountCode,
      percentAmount,
      discountAmount,
      maxDiscountDollar,
    });
  } catch (error) {
    next(error);
  }
}

export const createDiscountCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const newDiscountCoupon = new DiscountCoupon(req.body.discountCoupon);
  try {
    const discountCoupon = await newDiscountCoupon.save();

    res.json(discountCoupon);
  } catch (error) {
    next(error);
  }
}