import Section from "@/components/common/section/section";
import React from "react";
import CheckoutFormInputField from "../checkout-form/CheckoutFormInputField";
import {FieldValues, UseFormRegister} from "react-hook-form";
import { CustomerType } from "@/utils/types/Customer";
import { CheckoutFormData } from "../checkout-form/CheckoutForm";


const ShippingDetails: React.FC<{
  registerForm: UseFormRegister<CheckoutFormData>;
}> = ({registerForm}) => {
  return (
    <Section className="flex flex-col gap-y-5">
      <div>
        <span className="text-4xl font-semibold bg-white w-full uppercase">
          Shipping details
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-10">
        <CheckoutFormInputField
          id="firstName"
          label="First Name"
          register={registerForm}
          required
        />
        <CheckoutFormInputField
          id="lastName"
          label="Last name"
          register={registerForm}
          required
        />
      </div>

      <CheckoutFormInputField
        id="shippingAddress.country"
        label="Country / Region"
        register={registerForm}
        required
      />
      <CheckoutFormInputField
        id="shippingAddress.streetAddress"
        label="Street address"
        placeholder="House number and street name"
        register={registerForm}
        required
      />
      <CheckoutFormInputField
        id="shippingAddress.apartmentNumber"
        label="Apartment number (optional)"
        placeholder="Apartment, suite, unit, etc. (optional)"
        register={registerForm}
      />

      <CheckoutFormInputField
        id="shippingAddress.town"
        label="Town / City"
        register={registerForm}
        required
      />
      <CheckoutFormInputField
        id="shippingAddress.state"
        label="State"
        register={registerForm}
        required
      />

      <CheckoutFormInputField
        id="shippingAddress.zipCode"
        label="ZIP Code"
        register={registerForm}
        type="number"
        min={0}
        minLength={4}
        required
      />

      <CheckoutFormInputField
        id="email"
        label="Email address"
        type="email"
        register={registerForm}
        required
      />
    </Section>
  );
};

export default ShippingDetails;
