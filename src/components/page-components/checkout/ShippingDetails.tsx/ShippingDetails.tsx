import Section from "@/components/shared/section/section";
import React from "react";
import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {CustomerType} from "@/utils/types/Customer";
import {CheckoutFormData} from "../checkout-form/CheckoutForm";
import Input from "@/components/shared/input/Input";

const ShippingDetails: React.FC<{
  registerForm: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}> = ({registerForm, errors}) => {
  return (
    <Section className="flex flex-col gap-y-5">
      <div>
        <span className="text-4xl font-semibold bg-white w-full uppercase">
          Shipping details
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-10">
        <Input
          id="firstName"
          label="First Name"
          register={registerForm}
          required
          errors={errors}
        />
        <Input
          id="lastName"
          label="Last name"
          register={registerForm}
          required
          errors={errors}
        />
      </div>

      <Input
        id="shippingAddress.country"
        label="Country / Region"
        register={registerForm}
        required
        errors={errors}
      />
      <Input
        id="shippingAddress.streetAddress"
        label="Street address"
        placeholder="House number and street name"
        register={registerForm}
        required
        errors={errors}
      />
      <Input
        id="shippingAddress.apartmentNumber"
        label="Apartment number (optional)"
        placeholder="Apartment, suite, unit, etc. (optional)"
        register={registerForm}
        errors={errors}
      />

      <Input
        id="shippingAddress.town"
        label="Town / City"
        register={registerForm}
        required
        errors={errors}
      />
      <Input
        id="shippingAddress.state"
        label="State"
        register={registerForm}
        required
        errors={errors}
      />

      <Input
        id="shippingAddress.zipCode"
        label="ZIP Code"
        register={registerForm}
        type="number"
        min={0}
        minLength={4}
        required
        errors={errors}
      />

      <Input
        id="email"
        label="Email address"
        type="email"
        register={registerForm}
        required
        errors={errors}
      />
    </Section>
  );
};

export default ShippingDetails;
