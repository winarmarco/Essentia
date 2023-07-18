import { createAsyncThunk } from "@reduxjs/toolkit";
import { headers } from "next/dist/client/components/headers";

const GET_DISCOUNT_CODE = "discountCode/get";


export const getDiscountCode = createAsyncThunk(GET_DISCOUNT_CODE, async (discountCodeId: string) => {
  try {
    const res = await fetch("http://localhsot:3000/api/discount-code", {
      method: "POST", 
      body: JSON.stringify({
        discountCode: {_id: discountCodeId},
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