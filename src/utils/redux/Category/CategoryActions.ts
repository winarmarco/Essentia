import {createAsyncThunk} from "@reduxjs/toolkit";

const GET_CATEGORY = "category/get";

export const getCategory = createAsyncThunk(GET_CATEGORY, async () => {
  try {
    const res = await fetch("http://localhost:3000/api/category", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
});
