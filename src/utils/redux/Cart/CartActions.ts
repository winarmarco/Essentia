import {createAction, createAsyncThunk} from "@reduxjs/toolkit";

const ADD_ITEM = "cart/addItem";
const REMOVE_ITEM = "cart/removeItem";
const GET_CART = "cart/getCart";

export const addItemToCart = createAsyncThunk(
  ADD_ITEM,
  async (itemId: string) => {
    const res = await fetch("http://localhost:3000/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        product: {_id: itemId},
        user: {_id: "64b10ed056a74e371d0d792a"},
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    
    return data;
  }
);

export const removeItemFromCart = createAsyncThunk(
  REMOVE_ITEM,
  async (itemId: string) => {
    const res = await fetch("http://localhost:3000/api/cart/remove", {
      method: "POST",
      body: JSON.stringify({
        product: {_id: itemId},
        user: {_id: "64b10ed056a74e371d0d792a"},
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    
    return data;
  }
);

export const fetchCart = createAsyncThunk(GET_CART, async () => {
  try {
    const res = await fetch("http://localhost:3000/api/cart", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "64b10ed056a74e371d0d792a",
      },
    });

    console.log({res});

    const data = await res.json();
    console.log({data});
    return data;
  } catch (error) {
    console.log(error);
  }
});
