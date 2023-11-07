"use client";

import Button from "@/components/shared/Button";
import {ShoppingCartItemType} from "@/utils2/types/ShoppingCart";
import React, {useState} from "react";
import { twMerge } from "tailwind-merge";

type CartQuantityButtonProps = {
  className?: string;
  initQuantity: ShoppingCartItemType["quantity"];
  incrementQtyHandler: () => void;
  decrementQtyHandler: () => void;
};

const CartQuantityButton: React.FC<CartQuantityButtonProps> = ({className = "", initQuantity, incrementQtyHandler, decrementQtyHandler}) => {
  const [quantity, setQuantity] = useState(initQuantity);

  return (
    <div className={twMerge("flex items-center justify-center", className)}>
    {quantity ?       <div className="w-[100px] grid grid-cols-3">
        <button
          onClick={() => {
            setQuantity((prevQty) => (prevQty > 0 ? prevQty - 1 : prevQty));
            decrementQtyHandler();
          }}
          className="border border-r-0 border-black"
        >
          -
        </button>
        <span className="border border-black text-center">{quantity}</span>
        <button onClick={() => {
          setQuantity((prevQty) => (prevQty + 1));
          incrementQtyHandler();
        }}className="border border-l-0 border-black">+</button>
      </div> : 
      <Button onClick={() => {
        incrementQtyHandler();
        setQuantity((prevQty) => prevQty + 1);
      }} filled>Add to cart +</Button>}
    </div>
  );
};

export default CartQuantityButton;
