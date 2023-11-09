"use client";

import { ICart } from "@/utils/types/cart";
import { useState } from "react";
import Invoice from "../invoice/Invoice";
import CouponInput from "../coupon-input/CouponInput";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { IDiscountCouponClient } from "@/utils/types/discountCoupon";


export const TotalPriceSection: React.FC<{cart: ICart, totalPrice: number}> = ({cart, totalPrice}) => {
  const [discountCoupon, setDiscountCoupon] = useState<IDiscountCouponClient>();
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const setDiscountCouponHandler = (discountCoupon: IDiscountCouponClient, discountDollarAmount: number) => {
    setDiscountCoupon((prevState) => discountCoupon);
    setDiscountAmount((prevState) => discountDollarAmount);
  }

  return <>
  <Invoice discountCoupon={discountCoupon} discountAmount={discountAmount} cart={cart} subTotalPrice={totalPrice} />
  <CouponInput setDiscountCoupon={setDiscountCouponHandler}/>
  <Link href="/checkout">
    <Button className="mt-[8rem] w-full" filled>
      Checkout
    </Button>
  </Link>
  </>

}

