import { IShoppingCart } from "../../utils2/types";
import { IProduct } from "../../utils2/types";

export const findProductIndexInCart = (cart: IShoppingCart, productId: IProduct["_id"]) =>{
  const cartItems = cart.items;

  if (!cartItems) return -1;


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
