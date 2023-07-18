import { IShoppingCart } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addItemToCart, fetchCart, removeItemFromCart } from "./CartActions";


export interface CartState extends IShoppingCart{
  isLoading: boolean,
}

const initialCartState: CartState = {
  items: [],
  isLoading: false,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToCart.fulfilled, (state, action: PayloadAction<IShoppingCart>) => {
      const {items: updatedCartItems} = action.payload;
      return {
        ...state,
        items: updatedCartItems,
      }
    })

    builder.addCase(removeItemFromCart.fulfilled, (state, action: PayloadAction<IShoppingCart>) => {
      const {items: updatedCartITems} = action.payload;
      return {
        ...state,
        items: updatedCartITems
      };
    })

    builder
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<IShoppingCart>) => {
        const {items} = action.payload;
        return {
          ...state,
          items,
          isLoading: false,
        }
      }) 
      .addCase(fetchCart.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
        }
      })

  }

})


export default cartSlice;
export const cartSliceReducer = cartSlice.reducer;