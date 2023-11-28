"use client";

import TextInput from "@/components/shared/input/TextInput";
import React, {InputHTMLAttributes} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import { IDiscountCoupon, IDiscountCouponClient } from "@/utils/types/discountCoupon";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/utils/redux/store";
import {getDiscountCoupon} from "@/utils/redux/DiscountCoupon/DiscountCouponActions";
import Button from "@/components/shared/Button";
import { fetchDiscountCoupon } from "@/utils/actions/discount-code-actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { discountCouponActions } from "@/utils/redux/DiscountCoupon/DiscountCouponSlice";
import toast from "react-hot-toast";
import Input from "@/components/shared/input/Input";

interface CouponInput extends InputHTMLAttributes<HTMLInputElement> {

}

const CouponInput: React.FC<CouponInput> = ({id, ...others}) => {
  const {data: session} = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
  } = useForm<{discountCode: IDiscountCouponClient["discountCode"]}>();


  const submitHandler: SubmitHandler<{
    discountCode: IDiscountCouponClient["discountCode"];
  }> = async(data) => {
    if (session && session.user.token) {

      try {
        const {token} = session.user;
        const fetchedDiscountCoupon = await fetchDiscountCoupon(token.id, data.discountCode);

        const {discountCoupon, discountDollarAmount} = fetchedDiscountCoupon;
        dispatch(discountCouponActions.addDiscountCoupon({discountCoupon, totalDiscountAmount: discountDollarAmount}));
        
      } catch (error: any) {
        const errMessage = JSON.parse(error.message);
        setError("discountCode", {message: errMessage.message});
      }
      
    } else {
      router.push("/auth/signin");
    }
  };


  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-row items-start gap-x-4 mt-8">
        {/* <Input placeholder="Coupon Code" id="discountCode" register={register} error={errors["discountCode"]?.message} {...others} /> */}
        <Input
        id="discountCode"
        label=""
        register={register}
        errors={errors}
        />
        <Button filled>Apply</Button>
      </div>
    </form>
  );
};

export default CouponInput;