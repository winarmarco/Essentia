"use client";

import React from "react";
import ShippingDetails from "../ShippingDetails.tsx/ShippingDetails";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/common/Button";
import { IDiscountCouponClient, IShippingAddress, IUser } from "@/utils/types";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";

export interface CheckoutFormData {
  "firstName": IUser["firstName"];
  "lastName": IUser["lastName"];
  "email": IUser["email"];
  "shippingAddress": IShippingAddress;
  "cardNumber": string;
  "cardExpiry": string;
  "cardCsc": string;
}


const handleCheckout = async (checkoutData: CheckoutFormData & {discountCoupon: IDiscountCouponClient}) => {
  const {shippingAddress, discountCoupon, firstName, lastName, email} = checkoutData;

  try {
    const res = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        shippingAddress,
        discountCoupon,
        firstName,
        lastName,
        email,
      }),
      headers: {
        "Authorization": "64b10ed056a74e371d0d792a",
        "Content-Type": "application/json",
      },
    })

    const data = await res.json();

    return data;
  } catch (error) {
     return error;
  }
}


const CheckoutForm = () => {
  const discountCoupon = useSelector((state: RootState) => state.discountCoupon);

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<CheckoutFormData>();

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    try {
      console.log(data)
      const res = await handleCheckout({...data, discountCoupon: discountCoupon});

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-10 mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ShippingDetails registerForm={register} />

      <PaymentMethod setValue={setValue} registerForm={register} />

      <Button className="w-full mb-40 mt-20 py-3" filled>
        PLACE ORDER
      </Button>
    </form>
  );
};

export default CheckoutForm;
