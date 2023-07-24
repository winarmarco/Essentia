import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { signIn, signOut, signUp } from "./AuthActions";


export interface AuthenticationState {
  token?: string | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialAuthState: AuthenticationState = {
  token: undefined,
  isAuthenticated: false,
  isLoading: false,
}


const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    signOut,
  },
  extraReducers: (builders) => {
    builders
      .addCase(signIn.pending, (state) => {
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
          isLoading: false,
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
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
          isLoading: false,
        }
      })
      .addCase(signUp.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
        }
      })
  }
})

export default authSlice;
export const authSliceReducer = authSlice.reducer;
export const authActions = authSlice.actions;