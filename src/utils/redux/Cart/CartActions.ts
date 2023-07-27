import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CheckoutFormData } from "@/components/page-components/checkout/checkout-form/CheckoutForm";
import { BiErrorAlt } from "react-icons/bi";

const ADD_ITEM = "cart/addItem";
const REMOVE_ITEM = "cart/removeItem";
const GET_CART = "cart/getCart";
const CHECKOUT_CART = "cart/checkout";


export const addItemToCart = createAsyncThunk(ADD_ITEM, async (itemId: string, {dispatch, getState}) => {
    const state = getState() as RootState;

    const res = await fetch("http://localhost:3000/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        product: {_id: itemId},
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${state.auth.token}`,
      },
    });

    const data = await res.json();
    
    return data;
  }
);

export const removeItemFromCart = createAsyncThunk(REMOVE_ITEM, async (itemId: string, {dispatch, getState}) => {
    const state = getState() as RootState;
    try {
      const res = await fetch("http://localhost:3000/api/cart/remove", {
        method: "POST",
        body: JSON.stringify({
          product: {_id: itemId},
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${state.auth.token}`
        },
      });
  
      const data = await res.json();
      
      return data; 
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCart = createAsyncThunk(GET_CART, async (args, {dispatch, getState, rejectWithValue}) => {
  const state = getState() as RootState;
  
  try {
    const res = await fetch("http://localhost:3000/api/cart", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.auth.token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch cart");

    const data = await res.json();
  
    return data;
  } catch (error) {
    const err = error as Error;

    return rejectWithValue(err.message);
  }
});


export const checkoutCart = createAsyncThunk(CHECKOUT_CART, async (checkoutFormData: CheckoutFormData, {getState, dispatch}) => {
  const { shippingAddress, firstName, lastName, email, cardNumber, cardExpiry, cardCsc } = checkoutFormData;
  const { discountCoupon } = (getState() as RootState);

  try {
    const res = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify({
        shippingAddress,
        discountCoupon,
        firstName,
        lastName,
        email,
        cardNumber,
        cardExpiry,
        cardCsc 
      }),
      headers: {
        "Authorization": "64b10ed056a74e371d0d792a",
        "Content-Type": "application/json",
      },
    });


    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    throw error;
  }

})  