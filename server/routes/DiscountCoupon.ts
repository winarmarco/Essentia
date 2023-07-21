import { Router } from "express";
import { createDiscountCoupon, getDiscountCoupon } from "../controller/DiscountCoupon";

const router = Router();

router.post('/get', getDiscountCoupon);

router.post('/create', createDiscountCoupon);


export { router as discountCouponeRouter };