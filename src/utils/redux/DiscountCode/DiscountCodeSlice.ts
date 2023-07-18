import { IDiscountCode, IDiscountCodeClient } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDiscountCode } from "./DiscountCodeActions";

export interface DiscountCodeState extends IDiscountCodeClient {
  isLoading: boolean,
}

const initialDiscountCodeState: DiscountCodeState = {
  discountCode: undefined,
  percentAmount: undefined,
  discountAmount: undefined,
  maxDiscountDollar: undefined,
  isLoading: false,
}


export const discountCodeSlice = createSlice({
  name: "discountCode",
  initialState: initialDiscountCodeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getDiscountCode.fulfilled, (state, action: PayloadAction<IDiscountCodeClient>) => {
      return {
        ...state,
        isLoading: false,
      }
    })
    .addCase(getDiscountCode.pending,  (state, action) => {
      return {
        ...state,
        isLoading: true,
      }
    })
  }
})