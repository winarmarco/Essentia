import { IShoppingCart } from "../types";
import IProduct from "../types/Product";

export const findProductIndexInCart = (cart: IShoppingCart, productId: IProduct["_id"]) =>{
  const cartItems = cart.items;


  const index = cartItems.findIndex((cartItem) => {
    const { item } = cartItem;

    if (typeof item === "string") {
      return item === productId
    } else {
      return item._id === productId;
    }
  })  

  return index;
}
