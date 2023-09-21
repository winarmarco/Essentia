import { IShoppingCart } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addItemToCart, checkoutCart, fetchCart, removeItemFromCart } from "./CartActions";


export interface CartState extends IShoppingCart{
  hasFetched: boolean,
  isLoading: boolean,
}

const initialCartState: CartState = {
  items: [],
  hasFetched: false,
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
        const { items } = action.payload;
        return {
          ...state,
          items,
          hasFetched: true,
          isLoading: false,
        }
      }) 
      .addCase(fetchCart.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
        }
      }),

    builder
      .addCase(checkoutCart.fulfilled, (state) => {
        return {
          ...initialCartState,
        }
      })

  }

})


export default cartSlice;
export const cartSliceReducer = cartSlice.reducer;