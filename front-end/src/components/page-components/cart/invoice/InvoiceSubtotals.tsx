import React from "react";
import InvoiceLine from "./InvoiceLine";
import {IDiscountCouponClient} from "@/utils2/types";
import {LiaTimesSolid} from "react-icons/lia";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { discountCodeActions } from "@/utils/redux/DiscountCode/DiscountCodeSlice";

type InvoiceSubtotalsProps = {
  subtotal: number;
  discount: IDiscountCouponClient;
  discountDollarAmount?: number;
};

const InvoiceSubtotals: React.FC<InvoiceSubtotalsProps> = ({
  subtotal,
  discount,
  discountDollarAmount,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const discountPercentText =
    discount?.percentAmount && `(- ${discount.discountAmount}%)`;
  return (
    <ul>
      <InvoiceLine
        leftItem={<span>Subtotal</span>}
        rightItem={<span className="font-medium text-right">$ {subtotal}</span>}
      />

      {(discount && discount.discountCode) && (
        <InvoiceLine
          leftItem={
            <span>
              {discount.discountCode} {discountPercentText}
            </span>
          }
          rightItem={
            <span className="text-right flex flex-row items-center justify-between cursor-pointer mr-4">
              <span>- ${discountDollarAmount}</span>
              <LiaTimesSolid onClick={() => {dispatch(discountCodeActions.removeDiscountCoupon())}}/>
            </span>
          }
        />
      )}
    </ul>
  );
};

export default InvoiceSubtotals;
