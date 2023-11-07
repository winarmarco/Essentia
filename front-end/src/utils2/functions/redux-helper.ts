import { Slice } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer"

export const persistAsync = <S>(slice: Slice<S>) => {
  return persistReducer({
    key: slice.name,
    storage: storage,
    blacklist: ["isLoading", "hasFetched"],
  }, slice.reducer)
}