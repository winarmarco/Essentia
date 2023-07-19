import React from "react";
import InvoiceProductList from "./InvoiceProductList";
import InvoiceSubtotals from "./InvoiceSubtotals";
import InvoiceTotal from "./InvoiceTotal";
import {
  calculateDiscountDollar,
  calculateSubtotals,
} from "@/utils/functions/Invoice";
import { IInvoiceClient } from "@/utils/types";

const Invoice: React.FC<{invoice: IInvoiceClient, title?: string}> = ({invoice, title = "INVOICE"}) => {
  const {cart, discountCode} = invoice;

  let subtotal = calculateSubtotals(cart);
  let discountDollarAmount: number = 0;

  if (discountCode.discountCode) {
    discountDollarAmount = calculateDiscountDollar(subtotal, discountCode);
  }

  let total = subtotal - discountDollarAmount;

  return (
    <div className="flex flex-col p-5 pt-[3rem] border border-gray-200 max-w-[600px]">
      <h2 className="text-3xl font-semibold">{title}</h2>

      <div className="flex flex-col mt-5">
        <div className="mt-4 pb-4 border-b border-gray-200">
          <InvoiceProductList items={cart.items} />
        </div>

        <div className="mt-4 pb-4 border-b border-gray-200">
          <InvoiceSubtotals
            subtotal={subtotal}
            discount={discountCode}
            discountDollarAmount={discountDollarAmount}
          />
        </div>

        <div className="mt-4 pb-4">
          <InvoiceTotal total={total} />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
