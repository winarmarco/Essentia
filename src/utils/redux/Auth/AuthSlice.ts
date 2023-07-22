import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { signIn, signOut, signUp } from "./AuthActions";


export interface AuthenticationState {
  token?: string | undefined;
  isAuthenticated: boolean;
}

const initialAuthState: AuthenticationState = {
  token: undefined,
  isAuthenticated: false,
}


const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    signOut,
  },
  extraReducers: (builders) => {
    builders.addCase(signIn.fulfilled, (state, action: PayloadAction<AuthenticationState>) => {
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      }
    });
    builders.addCase(signUp.fulfilled, (state, action: PayloadAction<AuthenticationState>) => {
      return {
        ...state,
      }
    })
  }
})

export default authSlice;
export const authSliceReducer = authSlice.reducer;
export const authActions = authSlice.actions;