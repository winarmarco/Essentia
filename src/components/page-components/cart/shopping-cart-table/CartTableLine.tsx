import RelativeImage from "@/components/common/relative-image/RelativeImage";
import ShoppingCartType, {ShoppingCartItemType} from "@/types/ShoppingCart";
import React from "react";
import ProductProfile from "./CartTableProductProfile";
import CartProductProfile from "./CartTableProductProfile";
import CartQuantityButton from "./CartQuantityButton";

const CartTableLine: React.FC<ShoppingCartItemType> = ({product, quantity}) => {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] py-5 text-center">
      <div className="flex flex-row items-center justify-center">
        <RelativeImage
          src={product.images[0]}
          alt={product.name}
          className="min-w-[100px] md:w-[200px] relative aspect-square"
        />
        <CartProductProfile name={product.name} category={product.category} />
      </div>

      <div className="text-center flex items-center justify-center w-full">
        $ {product.price}
      </div>

      <div className="flex items-center justify-center ">
        <CartQuantityButton quanitty={quantity}/>
      </div>
    </div>
  );
};

export default CartTableLine;
