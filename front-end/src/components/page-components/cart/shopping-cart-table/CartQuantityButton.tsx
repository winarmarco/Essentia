"use client";

import Button from "@/components/shared/Button";
import { addToCart, removeFromCart } from "@/utils/actions/cart-action";
import {ShoppingCartItemType} from "@/utils2/types/ShoppingCart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {useState} from "react";
import { twMerge } from "tailwind-merge";

type CartQuantityButtonProps = {
  className?: string;
  initQuantity: ShoppingCartItemType["quantity"];
  productId: string
};

const CartQuantityButton: React.FC<CartQuantityButtonProps> = ({className = "", initQuantity, productId}) => {
  const [quantity, setQuantity] = useState(initQuantity);

  const {data: session} = useSession();
  const router = useRouter();
  const addToCartHandler = async () => {
    if (session && session.user.token && session.user.token.id) {
      const {token} = session.user;
      const res = await addToCart(token.id, productId);
      router.refresh();
      
    } else {
      router.push("/auth/login");
    }
  };

  const removeFromCartHandler = async () => {
    if (session && session.user.token && session.user.token.id) {
      const {token} = session.user;
      const res = await removeFromCart(token.id, productId);
      router.refresh();

    } else {
      // navigate to /auth/login
      router.push("/auth/signin");
    }
  };

  return (
    <div className={twMerge("flex items-center justify-center", className)}>
    {quantity ?       <div className="w-[100px] grid grid-cols-3">
        <button
          onClick={() => {
            setQuantity((prevQty) => (prevQty > 0 ? prevQty - 1 : prevQty));
            removeFromCartHandler();
          }}
          className="border border-r-0 border-black"
        >
          -
        </button>
        <span className="border border-black text-center">{quantity}</span>
        <button onClick={() => {
          setQuantity((prevQty) => (prevQty + 1));
          addToCartHandler();
        }}className="border border-l-0 border-black">+</button>
      </div> : 
      <Button onClick={() => {
        addToCartHandler();
        setQuantity((prevQty) => prevQty + 1);
      }} filled>Add to cart +</Button>}
    </div>
  );
};

export default CartQuantityButton;
