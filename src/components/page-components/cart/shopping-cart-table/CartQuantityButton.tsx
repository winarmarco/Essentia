"use client";

import {ShoppingCartItemType} from "@/utils/types/ShoppingCart";
import React, {useState} from "react";
import { twMerge } from "tailwind-merge";

type CartQuantityButtonProps = {
  className: string;
  initQuantity: ShoppingCartItemType["quantity"];
  incrementQtyHandler?: () => void;
  decrementQtyHandler?: () => void;
};

const CartQuantityButton: React.FC<CartQuantityButtonProps> = ({className, initQuantity, incrementQtyHandler, decrementQtyHandler}) => {
  const [quantity, setQuantity] = useState(initQuantity);

  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      <div className="w-[100px] grid grid-cols-3">
        <button
          onClick={() => {
            setQuantity((prevQty) => (prevQty > 0 ? prevQty - 1 : prevQty));
            if (decrementQtyHandler) decrementQtyHandler();
          }}
          className="border border-r-0 border-black"
        >
          -
        </button>
        <span className="border border-black text-center">{quantity}</span>
        <button onClick={() => {
          setQuantity((prevQty) => (prevQty + 1));
          if (incrementQtyHandler) incrementQtyHandler();
        }}className="border border-l-0 border-black">+</button>
      </div>
    </div>
  );
};

export default CartQuantityButton;
