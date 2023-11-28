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
import { CardSchema } from "@/utils/types/card";
import { createOrder } from "@/utils/actions/order-action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


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
    try {
      if (session && session.user.token) {
        const {token} = session.user;
        const createdOrder = await createOrder(token.id, data);  
        toast.success("Order success!");
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      return router.push("/");
    } catch (error) {
      toast.error("Could not create order. Please try again later!");
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
