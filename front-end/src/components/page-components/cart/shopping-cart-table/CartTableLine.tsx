import RelativeImage from "@/components/shared/relative-image/RelativeImage";
import React from "react";
import CartProductProfile from "./CartTableProductProfile";
import CartQuantityButton from "./CartQuantityButton";
import {IShoppingCartItem} from "@/utils/types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/utils/redux/store";
import {
  addItemToCart,
  removeItemFromCart,
} from "@/utils/redux/Cart/CartActions";

const CartTableLine: React.FC<IShoppingCartItem> = ({item, quantity}) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  console.log(token);

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] py-5 text-center">
      <div className="flex flex-row items-center justify-center">
        <RelativeImage
          src={item.images[0]}
          alt={item.name}
          className="min-w-[100px] md:w-[200px] relative aspect-square"
        />
        <CartProductProfile name={item.name} category={item.category} />
      </div>

      <div className="text-center flex items-center justify-center w-full">
        $ {item.price}
      </div>

      <div className="flex items-center justify-center ">
        <CartQuantityButton
          initQuantity={quantity}
          incrementQtyHandler={() => {
            dispatch(addItemToCart(item._id));
          }}
          decrementQtyHandler={() => {
            dispatch(removeItemFromCart(item._id));
          }}
        />
      </div>
    </div>
  );
};

export default CartTableLine;
