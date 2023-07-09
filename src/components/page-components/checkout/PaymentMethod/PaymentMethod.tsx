import Section from "@/components/common/section/section";
import CheckoutFormInputField from "../checkout-form-input-field/CheckoutFormInputField";
import {UseFormRegister, UseFormSetValue} from "react-hook-form";
import {CheckoutFormData} from "../checkout-form/CheckoutForm";
import { formatCardNumber, formatExpiryDate } from "@/utils/functions/Formatter";

const PaymentMethod: React.FC<{
  registerForm: UseFormRegister<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
}> = ({registerForm, setValue}) => {
  return (
    <Section className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-4">
        <span className="text-4xl font-semibold bg-white w-full uppercase">
          Payment Method
        </span>
        <span>Credit card</span>
      </div>
      <CheckoutFormInputField
        id="card-number"
        label="Card Number"
        placeholder="**** **** **** ****"
        required
        register={registerForm}
        onChange={(e) => {
          const inputtedCardNumber = e.target.value;
          setValue("card-number", formatCardNumber(inputtedCardNumber));
        }}

        maxLength={19}
      />

      <div className="grid grid-cols-2 gap-x-5">
        <CheckoutFormInputField
          id="card-expiry"
          label="Expiration (MM/YY)"
          placeholder="MM / YY"
          required
          onChange={(e) => {
            const inputtedValue = e.target.value;  
            setValue("card-expiry", formatExpiryDate(inputtedValue))
          }}
          maxLength={5}
          register={registerForm}
        />
        <CheckoutFormInputField
          id="card-csc"
          label="Card Security Code"
          placeholder="CSC"
          required
          register={registerForm}
          maxLength={3}
        />
      </div>
    </Section>
  );
};

export default PaymentMethod;
