import React from "react";
import InvoiceLine from "./InvoiceLine";
import { IDiscountCouponClient } from "@/utils/types";

type InvoiceSubtotalsProps = {
  subtotal: number;
  discount: IDiscountCouponClient;
  discountDollarAmount?: number;
};

const InvoiceSubtotals: React.FC<InvoiceSubtotalsProps> = ({
  subtotal,
  discount,
  discountDollarAmount
}) => {

  const discountPercentText = (discount?.percentAmount) && `(- ${discount.discountAmount}%)`
  return (
    <ul>
      <InvoiceLine
        leftItem={<span>Subtotal</span>}
        rightItem={<span className="font-medium text-right">$ {subtotal}</span>}
      />

      {discount.discountCode && (
        <InvoiceLine
          leftItem={<span>{discount.discountCode} {discountPercentText}</span>}
          rightItem={<span className="text-right">- ${discountDollarAmount}</span>}
        />
      )}
    </ul>
  );
};

export default InvoiceSubtotals;
