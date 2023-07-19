import RelativeImage from "@/components/common/relative-image/RelativeImage";
import React from "react";
import CartProductProfile from "./CartTableProductProfile";
import CartQuantityButton from "./CartQuantityButton";
import { IShoppingCartItem } from "@/utils/types";

const CartTableLine: React.FC<IShoppingCartItem> = ({item, quantity}) => {
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
        <CartQuantityButton initQuantity={quantity}/>
      </div>
    </div>
  );
};

export default CartTableLine;
