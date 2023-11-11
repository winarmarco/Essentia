"use client";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import ShippingDetails from "../ShippingDetails.tsx/ShippingDetails";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/shared/Button";
import {
  ShippingAddressSchema,
} from "@/utils/types/shippingAddress";
import {UserSchema} from "@/utils/types/user";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/utils/redux/store";
import { CardSchema } from "@/utils/types/card";
import { createOrder } from "@/utils/actions/order-action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const UserDetailsCheckoutSchema = UserSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
});
const ShippingAddressDetailsSchema = ShippingAddressSchema;
const CardDetailsSchema = CardSchema;
const CheckoutDetailsSchema = UserDetailsCheckoutSchema.extend({
  shippingAddress: ShippingAddressDetailsSchema,
  card: CardDetailsSchema,
});

export type ICheckoutDetails = z.infer<typeof CheckoutDetailsSchema>;

// const handleCheckout = async (checkoutData: CheckoutFormData & {discountCoupon: IDiscountCouponClient}) => {
//   const {shippingAddress, discountCoupon, firstName, lastName, email} = checkoutData;
//   try {
//     const res = await fetch("http://localhost:3000/api/checkout", {
//       method: "POST",
//       body: JSON.stringify({
//         shippingAddress,
//         discountCoupon,
//         firstName,
//         lastName,
//         email,
//       }),
//       headers: {
//         "Authorization": "64b10ed056a74e371d0d792a",
//         "Content-Type": "application/json",
//       },
//     })

//     const data = await res.json();

//     return data;
//   } catch (error) {
//      return error;
//   }
// }

const CheckoutForm = () => {
  const {data: session} = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
  } = useForm<ICheckoutDetails>({
    resolver: zodResolver(CheckoutDetailsSchema),
  });

  const checkoutHandler: SubmitHandler<ICheckoutDetails> = async (data) => {


    if (session && session.user.token && session.user.token.id) {
      const {token} = session.user;
      const createdOrder = await createOrder(token.id, data);
      return router.push("/");
    }
  };

  return (
    <form
      className="flex flex-col gap-y-10 mt-8"
      onSubmit={handleSubmit(checkoutHandler)}
    >
      <ShippingDetails registerForm={register} errors={errors} />

      <PaymentMethod setValue={setValue} registerForm={register} errors={errors} />

      <Button className="w-full mb-40 mt-20 py-3" filled>
        PLACE ORDER
      </Button>
    </form>
  );
};

export default CheckoutForm;
