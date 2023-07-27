import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { signIn, signOut, signUp } from "./AuthActions";


export interface AuthenticationState {
  token?: string | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasFetched: boolean;
}

const initialAuthState: AuthenticationState = {
  token: undefined,
  isAuthenticated: false,
  isLoading: false,
  hasFetched: false,
}


const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    signOut,
    toggleLoading: (state) => {
      console.log()
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    }
  },
  extraReducers: (builders) => {
    builders
      .addCase(signIn.pending, (state) => {
        console.log("PENDING...");
        return {
          ...state,
          isLoading: true,
        }
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<AuthenticationState>) => {
        return {
          ...state,
          token: action.payload.token,
          isAuthenticated: true,
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        return {
          ...state,
        }
      });


    builders
      .addCase(signUp.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        }
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<AuthenticationState>) => {
        return {
          ...state,
        }
      })
      .addCase(signUp.rejected, (state) => {
        return {
          ...state,
        }
      })
  }
})

export default authSlice;
export const authSliceReducer = authSlice.reducer;
export const authActions = authSlice.actions;