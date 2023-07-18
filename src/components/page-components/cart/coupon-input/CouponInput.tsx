import TextInput from "@/components/common/input/TextInput";
import React, {InputHTMLAttributes} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {IDiscountCode} from "@/utils/types";

interface CouponInput extends InputHTMLAttributes<HTMLInputElement> {}

const CouponInput: React.FC<CouponInput> = ({id, ...others}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<{discountCode: IDiscountCode["discountCode"]}>();

  const submitHandler: SubmitHandler<{discountCode: IDiscountCode["discountCode"]}> = (data) => {
    
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col">
        <label>Coupon Input</label>
        <TextInput id="discountCode" register={register} {...others} />
      </div>
    </form>
  );
};

export default CouponInput;
