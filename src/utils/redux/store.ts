import {ThunkDispatch} from 'redux-thunk';
import thunk from 'redux-thunk';
import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartSliceReducer } from "./Cart/CartSlice";
import { discountCodeReducer, discountCodeSlice } from "./DiscountCode/DiscountCodeSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import authSlice, { authSliceReducer } from './Auth/AuthSlice';

const rootReducer = combineReducers({
  [cartSlice.name]: cartSliceReducer,
  [discountCodeSlice.name] : discountCodeReducer,
  [authSlice.name]: authSliceReducer,
})


const persistConfig = {
  key: "root",
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, void, AnyAction>;