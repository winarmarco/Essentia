"use client";

import TextInput from "@/components/shared/input/TextInput";
import React, {InputHTMLAttributes} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import { IDiscountCoupon, IDiscountCouponClient } from "@/utils/types/discountCoupon";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/utils/redux/store";
import {getDiscountCoupon} from "@/utils/redux/DiscountCode/DiscountCodeActions";
import Button from "@/components/shared/Button";
import { fetchDiscountCoupon } from "@/utils/actions/discount-code-actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CouponInput extends InputHTMLAttributes<HTMLInputElement> {
  setDiscountCoupon: (discountCoupon: IDiscountCouponClient, discountDollarAmount: number) => void;
}

const CouponInput: React.FC<CouponInput> = ({id, setDiscountCoupon, ...others}) => {
  const {data: session} = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<{discountCode: IDiscountCouponClient["discountCode"]}>();



  const submitHandler: SubmitHandler<{
    discountCode: IDiscountCouponClient["discountCode"];
  }> = async(data) => {
    if (session && session.user.token && session.user.token.id) {

      const {token} = session.user;
      const fetchedDiscountCoupon = await fetchDiscountCoupon(token.id, data.discountCode);
      const {discountCoupon, discountDollarAmount} = fetchedDiscountCoupon;
      setDiscountCoupon(discountCoupon, discountDollarAmount);
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-row items-center gap-x-4 mt-8">
        <TextInput placeholder="Coupon Code" id="discountCode" register={register} error={errors["discountCode"]?.message} {...others} />
        <Button filled>Apply</Button>
      </div>
    </form>
  );
};

export default CouponInput;