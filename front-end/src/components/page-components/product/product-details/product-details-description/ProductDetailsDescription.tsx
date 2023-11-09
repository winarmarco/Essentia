import CartQuantityButton from "@/components/page-components/cart/shopping-cart-table/CartQuantityButton";
import React from "react";
import {IProduct} from "@/utils/types/products";


const ProductDetailsDescription: React.FC<{product: IProduct, quantity: number}> = ({product, quantity}) => {
  const {_id: productId, name, description, price} = product;
  return (
    <div className="flex flex-col px-5 mt-10 md:pt-20">
      <h2 className="text-3xl font-semibold">{name}</h2>
      <p className="leading-loose pt-2 whitespace-pre-line">
        {description.trim()}
      </p>
      <span className="mt-10">Category : {``}</span>
      <span className="mt-5">Price : {`$ ${price}`}</span>
      <CartQuantityButton
        className="justify-start mt-10"
        initQuantity={quantity}
        productId={productId}
      />
    </div>
  );
};

export default ProductDetailsDescription;
