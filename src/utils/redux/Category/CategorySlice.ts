import {IProductCategory} from "@/utils/types";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {getCategory} from "./CategoryActions";

export interface CategoryState {
  category: IProductCategory[];
  isLoading: boolean;
  hasFetched: boolean;
}

export const initialCategoryState: CategoryState = {
  category: [],
  isLoading: false,
  hasFetched: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initialCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getCategory.fulfilled,
        (state, action: PayloadAction<{category: IProductCategory[]}>) => {
          return {
            ...state,
            category: action.payload.category,
            isLoading: false,
            hasFetched: true,
          };
        }
      )
      .addCase(getCategory.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(getCategory.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
        }
      })
  },
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;