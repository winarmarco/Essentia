import { createAsyncThunk } from "@reduxjs/toolkit";

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
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
})