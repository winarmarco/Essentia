import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDiscountCouponClient } from "@/utils/types/discountCoupon";

export interface IDiscountCouponState {
  discountCoupon?: IDiscountCouponClient,
  totalDiscountAmount?: number,
}

export const initialDiscountCouponState: IDiscountCouponState = {
  discountCoupon: undefined,
  totalDiscountAmount: 0,
}


export const discountCouponSlice = createSlice({
  name: "discountCoupon",
  initialState: initialDiscountCouponState,
  reducers: {
    removeDiscountCoupon(state) {
      state = initialDiscountCouponState;
      return state;
    },
    addDiscountCoupon(state, action: PayloadAction<IDiscountCouponState>) {
      state = action.payload;
      return state;
    }
  },
})

export const discountCouponReducer = discountCouponSlice.reducer;
export const discountCouponActions = discountCouponSlice.actions;