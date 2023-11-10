import {ThunkDispatch} from "redux-thunk";
import thunk from "redux-thunk";
import {AnyAction, combineReducers, configureStore} from "@reduxjs/toolkit";
import cartSlice from "./Cart/CartSlice";
import {discountCouponSlice, discountCouponReducer} from "./DiscountCoupon/DiscountCouponSlice";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import authSlice from "./Auth/AuthSlice";
import UISlice, {uiReducers} from "./UI/UISlice";
import {persistAsync} from "../functions/redux-helper";
import {categorySlice} from "./Category/CategorySlice";

const rootReducer = combineReducers({
  [discountCouponSlice.name]: discountCouponReducer,
  [UISlice.name]: uiReducers,
});

// const persistedReducer = persistReducer(
//   {
//     key: "root",
//     storage: storage,
//     blacklist: [
//       authSlice.name,
//       discountCodeSlice.name,
//       cartSlice.name,
//       categorySlice.name,
//     ],
//   },
//   rootReducer
// );

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
// export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<RootState, void, AnyAction>;
