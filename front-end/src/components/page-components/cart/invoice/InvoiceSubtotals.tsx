import React from "react";
import InvoiceLine from "./InvoiceLine";
import {LiaTimesSolid} from "react-icons/lia";
import { IDiscountCouponClient } from "@/utils/types/discountCoupon";
import { useDispatch } from "react-redux";
import { discountCouponActions } from "@/utils/redux/DiscountCoupon/DiscountCouponSlice";

type InvoiceSubtotalsProps = {
  subtotal: number;
  discount?: IDiscountCouponClient,
  discountDollarAmount?: number;
};

const InvoiceSubtotals: React.FC<InvoiceSubtotalsProps> = ({
  subtotal,
  discount,
  discountDollarAmount,
}) => {
  const dispatch = useDispatch();
  const discountPercentText = discount?.percentAmount && `(- ${discount.discountAmount}%)`;

  
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
              <LiaTimesSolid onClick={() => {dispatch(discountCouponActions.removeDiscountCoupon())}} />
            </span>
          }
        />
      )}
    </ul>
  );
};

export default InvoiceSubtotals;
