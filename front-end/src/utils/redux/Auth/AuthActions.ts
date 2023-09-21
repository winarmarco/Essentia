import { ISignInUser, ISignUpUser } from "@/utils/types";
import { CaseReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthenticationState, authActions } from "./AuthSlice";
import { RootState } from "../store";

const SIGN_IN = "auth/signin";
const SIGN_UP = "auth/signup";
const SIGN_OUT = "auth/signout";

export const signIn = createAsyncThunk(SIGN_IN, async (signInData: ISignInUser, { dispatch }) => {
  try {
    const res = await fetch("http://localhost:3000/api/signin", {
      method: "POST",
      body: JSON.stringify({
        user: signInData
      }),
      headers: {
        "Content-Type": 'application/json',
      }
    });

    const data = await res.json();


    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    throw error;
  }
})

export const signUp = createAsyncThunk(SIGN_UP, async (signUpData: ISignUpUser, { dispatch }) => {
  try {
    
    const res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      body: JSON.stringify({
        user: signUpData
      }),
      headers: {
        "Content-Type": 'application/json',
      }
    })

    const data = await res.json();


    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}) 

export const signOut: CaseReducer<AuthenticationState> = (state, action) => {
  console.log("SIGNING OUT");
  return {
    ...state,
    token: undefined,
    isAuthenticated: false,
  }
}