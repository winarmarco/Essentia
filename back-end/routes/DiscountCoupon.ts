import { Router } from "express";
import { createDiscountCoupon, getDiscountCoupon, updateDiscountCoupon } from "../controller/DiscountCoupon";
import { isAuth } from "../utils/middleware/Authentication";
import { isAdmin } from "../utils/middleware/Authorization";
import { body, param } from "express-validator";
import { parseFormData } from "../utils/middleware/parseFormData";
import DiscountCoupon, { IDiscountCouponStatus } from "../model/DiscountCoupon";
import mongoose from "mongoose";
import { NotFoundError } from "../utils/Errors/NotFoundError";
import { AttachedRequest, validateId } from "../utils/middleware/ValidateId";

const router = Router();

// Get an existing discount coupon
// Authorization: *
// method: GET
// path: /discount-coupon
// body: -
router.get('/:code', 
  isAuth,
  getDiscountCoupon);


// Create a new discount coupon
// Authorization: ADMIN
// method: POST
// path: /discount-coupon
// body: {discountCoupon: {discountCode; String. discountAmount: number}}
router.post('/', 
  isAuth, 
  isAdmin, 
  parseFormData,
  body("discountCoupon.discountCode").
    notEmpty().withMessage("Discount Code is required"),
  body("discountCoupon.discountAmount")
    .notEmpty().withMessage("Discount Amount is required")
    .isNumeric().withMessage("Discount Amount must be numerical value")
    .custom((value, {req}) => {
      if (req.body.discountCoupon?.percentAmount) {
        if (0 > value || value > 100) return Promise.reject("Discount Amount must be between 0 to 100 for percentAmount: true");
      }
      return Promise.resolve();
    }),
  createDiscountCoupon);


// Update a discount coupon
// Authorization: ADMIN
// method: POST
// path: /discount-coupon/<discountCouponId>
// body: {discountCoupon?: {discountCode; String. discountAmount?: number}}
router.patch('/:couponId',
  isAuth,
  isAdmin,
  validateId({path: "params.couponId", model: DiscountCoupon}),
  body("discountCoupon.discountCode")
    .optional()
    .notEmpty().withMessage("Discount Code is required")
    .custom(async (value, {req}) => {
      const discountCouponWithCode = await DiscountCoupon.findOne({discountCode: value, status: IDiscountCouponStatus.ACTIVE, _id: {$ne: new mongoose.Types.ObjectId(req.params?.couponId)}});

      if (discountCouponWithCode) return Promise.reject(`Discount Coupon with code '${value}' has already exists`)

      return Promise.resolve();
    }),
  body("discountCoupon.discountAmount")
    .optional().notEmpty()
    .isNumeric().withMessage("Discount Amount must be numerical value")
    .custom(async (value, {req}) => { 
      let percentAmount;
      if (!req.body.discountCoupon.percentAmount) {
        const discountCoupon = (req as AttachedRequest).document;
        percentAmount = discountCoupon.percentAmount;
      } else {
        percentAmount = req.body.discountCoupon.percentAmount
      }

      if (percentAmount) {
        if (0 > value || 100 < value) return Promise.reject("Discount Amount must be between 0 to 100 for percentAmount: true");
      }
    return Promise.resolve();
  }),
updateDiscountCoupon);


export { router as discountCouponeRouter };