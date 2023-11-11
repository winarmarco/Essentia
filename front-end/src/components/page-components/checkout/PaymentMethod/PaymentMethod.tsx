import Section from "@/components/shared/section/section";
import {FieldErrors, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {
  formatCardNumber,
  formatCsc,
  formatExpiryDate,
} from "@/utils/functions/InputFormatter";
import Input from "@/components/shared/input/Input";
import {ICheckoutDetails} from "../checkout-form/CheckoutForm";

const PaymentMethod: React.FC<{
  registerForm: UseFormRegister<ICheckoutDetails>;
  setValue: UseFormSetValue<ICheckoutDetails>;
  errors: FieldErrors<ICheckoutDetails>;
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
        id="card.cardNumber"
        label="Card Number"
        placeholder="**** **** **** ****"
        required
        register={registerForm}
        onChange={(e) => {
          const inputtedCardNumber = e.target.value;
          setValue("card.cardNumber", formatCardNumber(inputtedCardNumber));
        }}
        maxLength={19}
        errors={errors}
      />

      <div className="grid grid-cols-2 gap-x-5">
        <Input
          id="card.expiryDate"
          label="Expiration (MM/YY)"
          placeholder="MM / YY"
          required
          onChange={(e) => {
            const inputtedValue = e.target.value;
            setValue("card.expiryDate", formatExpiryDate(inputtedValue));
          }}
          maxLength={5}
          register={registerForm}
          errors={errors}
        />
        <Input
          id="card.CSC"
          label="Card Security Code"
          placeholder="CSC"
          required
          register={registerForm}
          maxLength={3}
          onChange={(e) => {
            const inputtedValue = e.target.value;
            setValue("card.CSC", formatCsc(inputtedValue));
          }}
          errors={errors}
        />
      </div>

      <Input
          id="card.holder"
          label="Card Holder"
          placeholder=""
          required
          register={registerForm}
          errors={errors}
        />
    </Section>
  );
};

export default PaymentMethod;
