import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartSliceReducer } from "./Cart/CartSlice";

export const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSliceReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


