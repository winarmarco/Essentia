import { CaseReducer, PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";

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
    setIsLoading: (state, action: PayloadAction<{isLoading: UIState["isLoading"]}>) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    },
    setHasFetched: (state, action: PayloadAction<{hasFetched: UIState["hasFetched"]}>) => {
      return {
        ...state,
        hasFetched: action.payload.hasFetched,
      }
    }
  }
})

export default UISlice;
export const UIActions = UISlice.actions;
export const uiReducers = UISlice.reducer;