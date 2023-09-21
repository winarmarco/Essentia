import IProduct from "@/utils/types/Product";

export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";

export interface AddItem {
  type: typeof ADD_ITEM;
  payload: {
    productId: IProduct["_id"]
  }
}

export interface RemoveItem {
  type: typeof REMOVE_ITEM;
  payload: {
    productId: IProduct["_id"]
  }
}

export type CartActionTypes = AddItem | RemoveItem;