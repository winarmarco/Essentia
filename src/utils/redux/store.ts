import {ThunkDispatch} from 'redux-thunk';
import thunk from 'redux-thunk';
import { AnyAction, Slice, combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartSliceReducer } from "./Cart/CartSlice";
import { discountCodeReducer, discountCodeSlice } from "./DiscountCode/DiscountCodeSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import authSlice, { authSliceReducer } from './Auth/AuthSlice';
import UISlice, { uiReducers } from './UI/UISlice';
import { persistAsync } from '../functions/redux-helper';


const rootReducer = combineReducers({
  [cartSlice.name]: persistAsync(cartSlice),
  [discountCodeSlice.name] : persistAsync(discountCodeSlice),
  [authSlice.name]: authSliceReducer,
  [UISlice.name]: uiReducers,
})

const persistedReducer = persistReducer({
  key: "root",
  storage: storage,
  blacklist: ["UI"],
},rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, void, AnyAction>;