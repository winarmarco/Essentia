import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
  hasFetched: boolean;
  isLoading: boolean;
}

const initialUIState: UIState = {
  hasFetched: false,
  isLoading: false,
}

export const UISlice = createSlice({
  name: "UI",
  initialState: initialUIState,
  reducers: {
    
  }
})