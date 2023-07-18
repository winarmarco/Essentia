import IProduct from "@/utils/types/Product";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductsState {
  products: IProduct[]
}

const initialProductState: ProductsState = {
  products: []
}

export const productState = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    
  }
})