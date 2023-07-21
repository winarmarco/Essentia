import { IDiscountCouponClient } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDiscountCoupon } from "./DiscountCodeActions";

export interface DiscountCouponState extends IDiscountCouponClient {
  isLoading: boolean,
}

const initialDiscountCouponState: DiscountCouponState = {
  discountCode: undefined,
  percentAmount: undefined,
  discountAmount: undefined,
  maxDiscountDollar: undefined,
  isLoading: false,
}


export const discountCodeSlice = createSlice({
  name: "discountCoupon",
  initialState: initialDiscountCouponState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getDiscountCoupon.fulfilled, (state, action: PayloadAction<IDiscountCouponClient>) => {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    })
    .addCase(getDiscountCoupon.pending,  (state, action) => {
      return {
        ...state,
        isLoading: true,
      }
    })
  }
})

export const discountCodeReducer = discountCodeSlice.reducer;