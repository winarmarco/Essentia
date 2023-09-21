"use client";

import React from "react";
import ShippingDetails from "../ShippingDetails.tsx/ShippingDetails";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/shared/Button";
import { IDiscountCouponClient, IShippingAddress, IUser } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/store";
import { checkoutCart } from "@/utils/redux/Cart/CartActions";
import { parseError } from "@/utils/functions/errorParser";

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
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
  } = useForm<CheckoutFormData>();

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    try {
      const res = await dispatch(checkoutCart(data)).unwrap();
      // const res = await handleCheckout({...data, discountCoupon: discountCoupon});

    } catch (error) {
      const errMessage = parseError(error);
      
      if (Array.isArray(errMessage)) {
        errMessage.forEach((err) => {
          setError(err.field, {
            type: "custom",
            message: err.message,
          })
        })
      } else {
        setError("root", {
          type: 'custom',
          message: errMessage.message,
        });
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-y-10 mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ShippingDetails registerForm={register} errors={errors}/>

      <PaymentMethod setValue={setValue} registerForm={register} errors={errors} />

      <Button className="w-full mb-40 mt-20 py-3" filled>
        PLACE ORDER
      </Button>
    </form>
  );
};

export default CheckoutForm;
