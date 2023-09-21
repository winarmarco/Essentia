import { CaseReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { DiscountCouponState, initialDiscountCouponState } from "./DiscountCodeSlice";

const GET_DISCOUNT_COUPON = "discountCoupon/get";


export const getDiscountCoupon = createAsyncThunk(GET_DISCOUNT_COUPON, async (discountCode: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/discount-coupon/get", {
      method: "POST", 
      body: JSON.stringify({
        discountCoupon: {discountCode},
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
})

export const removeDiscountCoupon: CaseReducer<DiscountCouponState> = (state) => {
  return {
    ...initialDiscountCouponState,
  };
}