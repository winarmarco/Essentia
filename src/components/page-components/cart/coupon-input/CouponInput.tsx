import TextInput from "@/components/common/input/TextInput";
import React, {InputHTMLAttributes} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {IDiscountCoupon} from "@/utils/types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/utils/redux/store";
import {getDiscountCoupon} from "@/utils/redux/DiscountCode/DiscountCodeActions";
import Button from "@/components/common/Button";

interface CouponInput extends InputHTMLAttributes<HTMLInputElement> {}

const CouponInput: React.FC<CouponInput> = ({id, ...others}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<{discountCode: IDiscountCoupon["discountCode"]}>();

  const submitHandler: SubmitHandler<{
    discountCode: IDiscountCoupon["discountCode"];
  }> = (data) => {
    if (data && data.discountCode) {
      dispatch(getDiscountCoupon(String(data.discountCode)));
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-row items-center gap-x-4 mt-8">
        <label>Coupon Code</label>
        <TextInput id="discountCode" register={register} {...others} />
        <Button filled>Apply</Button>
      </div>
    </form>
  );
};

export default CouponInput;