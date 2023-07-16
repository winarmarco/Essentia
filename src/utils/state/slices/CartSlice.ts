import { createSlice } from "@reduxjs/toolkit";
import Product from "../../types/Product"

export interface CartState {
  cartState: Product[];
}

const initialCartState: CartState = {
  cartState: []
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    setCartState(state, action) {
      state.cartState = action.payload;
    }
  }
})


export const {setCartState} = cartSlice.actions;
export default cartSlice.reducer;