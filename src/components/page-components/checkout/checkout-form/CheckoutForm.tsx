"use client";

import Section from "@/components/common/section/section";
import React from "react";
import ShippingDetails from "../ShippingDetails.tsx/ShippingDetails";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/common/Button";

interface CheckoutFormData {
  "first-name": String;
  "last-name": String;
  country: String;
  address: String;
  "apartment-number": String;
  town: String;
  state: String;
  "zip-code": String;
  "email-address": String;
  "card-number": String;
  "card-expiry": String;
  "card-csc": String;
}

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<CheckoutFormData>();

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => console.log(data);

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

export type {CheckoutFormData};
