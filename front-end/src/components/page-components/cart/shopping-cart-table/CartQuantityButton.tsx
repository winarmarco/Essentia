"use client";

import Button from "@/components/shared/Button";
import Loading from "@/components/shared/loading/Loading";
import {addToCart, removeFromCart} from "@/utils/actions/cart-action";
import {discountCouponActions} from "@/utils/redux/DiscountCoupon/DiscountCouponSlice";
import {ICart} from "@/utils/types/cart";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {twMerge} from "tailwind-merge";
import toast from "react-hot-toast";

type CartQuantityButtonProps = {
  className?: string;
  initQuantity: ICart["items"][0]["quantity"];
  productId: string;
};

const CartQuantityButton: React.FC<CartQuantityButtonProps> = ({
  className = "",
  initQuantity,
  productId,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(initQuantity);
  const [isLoading, setIsLoading] = useState(false);

  const {data: session} = useSession();
  const router = useRouter();
  const addToCartHandler = async () => {
    setIsLoading(true);

    try {
      if (session && session.user.token) {
        const {token} = session.user;
        const res = await addToCart(token.id, productId);
        setQuantity((prevQty) => prevQty + 1);
        dispatch(discountCouponActions.removeDiscountCoupon());
        router.refresh();
      } else {
        router.push("/auth/login");
      } 
    } catch (error: any) {
      const errMessage = JSON.parse(error.message);
      toast.error(errMessage.message);
    }
    setIsLoading(false);
  };

  const removeFromCartHandler = async () => {
    setIsLoading(true);
    try {
      if (session && session.user.token) {
        const {token} = session.user;
        const res = await removeFromCart(token.id, productId);
        dispatch(discountCouponActions.removeDiscountCoupon());
        setQuantity((prevQty) =>
          prevQty > 0 ? prevQty - 1 : prevQty
        );
        router.refresh();
      } else {
        // navigate to /auth/login
        router.push("/auth/signin");
      } 
    } catch (error: any) {
      const errMessage = JSON.parse(error.message);
      toast.error(errMessage.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={twMerge("flex items-center justify-center", className)}>

      {quantity ? (
        <div className="w-[100px] grid grid-cols-3">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <button
                onClick={() => {
                  removeFromCartHandler();
                }}
                className="border border-r-0 border-black"
              >
                -
              </button>
              <span className="border border-black text-center">
                {quantity}
              </span>
              <button
                onClick={() => {
                  addToCartHandler();
                }}
                className="border border-l-0 border-black"
              >
                +
              </button>
            </>
          )}
        </div>
      ) : (
        <Button
          onClick={() => {
            addToCartHandler();
          }}
          disabled={isLoading}
          filled
        >
          {isLoading ? <Loading /> : "Add to Cart +"}
        </Button>
      )}
    </div>
  );
};

export default CartQuantityButton;
