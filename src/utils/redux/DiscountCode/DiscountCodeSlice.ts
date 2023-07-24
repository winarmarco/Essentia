import { IDiscountCouponClient } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDiscountCoupon, removeDiscountCoupon } from "./DiscountCodeActions";

export interface DiscountCouponState extends IDiscountCouponClient {
  isLoading: boolean,
  hasFetched: boolean,
}

export const initialDiscountCouponState: DiscountCouponState = {
  discountCode: undefined,
  percentAmount: undefined,
  discountAmount: undefined,
  maxDiscountDollar: undefined,
  isLoading: false,
  hasFetched: false,
}


export const discountCodeSlice = createSlice({
  name: "discountCoupon",
  initialState: initialDiscountCouponState,
  reducers: {
    removeDiscountCoupon,
  },
  extraReducers: (builder) => {
    builder
    .addCase(getDiscountCoupon.fulfilled, (state, action: PayloadAction<IDiscountCouponClient>) => {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        hasFetched: true,
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
export const discountCodeActions = discountCodeSlice.actions;