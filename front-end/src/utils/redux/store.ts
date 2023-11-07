import {ThunkDispatch} from "redux-thunk";
import thunk from "redux-thunk";
import {AnyAction, combineReducers, configureStore} from "@reduxjs/toolkit";
import cartSlice from "./Cart/CartSlice";
import {discountCodeSlice} from "./DiscountCode/DiscountCodeSlice";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import authSlice from "./Auth/AuthSlice";
import UISlice, {uiReducers} from "./UI/UISlice";
import {persistAsync} from "../../utils2/functions/redux-helper";
import {categorySlice} from "./Category/CategorySlice";

const rootReducer = combineReducers({
  [cartSlice.name]: persistAsync(cartSlice),
  [discountCodeSlice.name]: persistAsync(discountCodeSlice),
  [authSlice.name]: persistAsync(authSlice),
  [categorySlice.name]: persistAsync(categorySlice),
  [UISlice.name]: uiReducers,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: storage,
    blacklist: [
      authSlice.name,
      discountCodeSlice.name,
      cartSlice.name,
      categorySlice.name,
    ],
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<RootState, void, AnyAction>;
