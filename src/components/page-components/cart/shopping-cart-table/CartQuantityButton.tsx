"use client";

import {ShoppingCartItemType} from "@/utils/types/ShoppingCart";
import React, {useState} from "react";

type CartQuantityButtonProps = {
  quanitty: ShoppingCartItemType["quantity"];
};

const CartQuantityButton: React.FC<CartQuantityButtonProps> = ({quanitty}) => {
  const [quantity, setQuantity] = useState(quanitty);

  return (
    <div className="flex items-center justify-center ">
      <div className="w-[100px] grid grid-cols-3">
        <button
          onClick={() => {
            setQuantity((prevQty) => (prevQty > 0 ? prevQty - 1 : prevQty));
          }}
          className="border border-r-0 border-black"
        >
          -
        </button>
        <span className="border border-black">{quantity}</span>
        <button onClick={() => {
          setQuantity((prevQty) => (prevQty + 1));
        }}className="border border-l-0 border-black">+</button>
      </div>
    </div>
  );
};

export default CartQuantityButton;
