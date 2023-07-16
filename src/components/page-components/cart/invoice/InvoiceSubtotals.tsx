import React from "react";
import InvoiceLine from "./InvoiceLine";
import {spawn} from "child_process";
import DiscountType from "@/utils/types/DiscountType";

type InvoiceSubtotalsProps = {
  subtotal: number;
  discount?: DiscountType;
  discountDollarAmount?: number;
};

const InvoiceSubtotals: React.FC<InvoiceSubtotalsProps> = ({
  subtotal,
  discount,
  discountDollarAmount
}) => {

  const discountPercentText = (discount?.percent) && `(- ${discount.amount}%)`
  return (
    <ul>
      <InvoiceLine
        leftItem={<span>Subtotal</span>}
        rightItem={<span className="font-medium text-right">$ {subtotal}</span>}
      />

      {discount && (
        <InvoiceLine
          leftItem={<span>{discount.discountCode} {discountPercentText}</span>}
          rightItem={<span className="text-right">- ${discountDollarAmount}</span>}
        />
      )}
    </ul>
  );
};

export default InvoiceSubtotals;
