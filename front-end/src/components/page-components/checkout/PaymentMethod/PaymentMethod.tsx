import Section from "@/components/shared/section/section";
import {FieldErrors, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {
  formatCardNumber,
  formatCsc,
  formatExpiryDate,
} from "@/utils2/functions/InputFormatter";
import {CheckoutFormData} from "../checkout-form/CheckoutForm";
import Input from "@/components/shared/input/Input";

const PaymentMethod: React.FC<{
  registerForm: UseFormRegister<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}> = ({registerForm, setValue, errors}) => {
  return (
    <Section className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-4">
        <span className="text-4xl font-semibold bg-white w-full uppercase">
          Payment Method
        </span>
        <span>Credit card</span>
      </div>
      <Input
        id="cardNumber"
        label="Card Number"
        placeholder="**** **** **** ****"
        required
        register={registerForm}
        onChange={(e) => {
          const inputtedCardNumber = e.target.value;
          setValue("cardNumber", formatCardNumber(inputtedCardNumber));
        }}
        maxLength={19}
        errors={errors}
      />

      <div className="grid grid-cols-2 gap-x-5">
        <Input
          id="cardExpiry"
          label="Expiration (MM/YY)"
          placeholder="MM / YY"
          required
          onChange={(e) => {
            const inputtedValue = e.target.value;
            setValue("cardExpiry", formatExpiryDate(inputtedValue));
          }}
          maxLength={5}
          register={registerForm}
          errors={errors}
        />
        <Input
          id="cardCsc"
          label="Card Security Code"
          placeholder="CSC"
          required
          register={registerForm}
          maxLength={3}
          onChange={(e) => {
            const inputtedValue = e.target.value;
            setValue("cardCsc", formatCsc(inputtedValue));
          }}
          errors={errors}
        />
      </div>
    </Section>
  );
};

export default PaymentMethod;
