import React from "react";
import InvoiceProductList from "./InvoiceProductList";
import ShoppingCart from "@/types/ShoppingCart";
import InvoiceLine from "./InvoiceLine";
import InvoiceSubtotals from "./InvoiceSubtotals";
import InvoiceType from "@/types/Invoice";
import DiscountType from "@/types/DiscountType";
import InvoiceTotal from "./InvoiceTotal";
import {
  calculateDiscountDollar,
  calculateSubtotals,
} from "@/utils/functions/Invoice";

const Invoice: React.FC<{invoice: InvoiceType, title?: string}> = ({invoice, title = "INVOICE"}) => {
  const {cart, discount} = invoice;

  let subtotal = calculateSubtotals(cart);
  let discountDollarAmount = 0;

  if (discount) {
    discountDollarAmount = calculateDiscountDollar(subtotal, discount);
  }

  let total = subtotal - discountDollarAmount;

  return (
    <div className="flex flex-col p-5 pt-[3rem] border border-gray-200">
      <h2 className="text-3xl font-semibold">{title}</h2>

      <div className="flex flex-col mt-5">
        <div className="mt-4 pb-4 border-b border-gray-200">
          <InvoiceProductList items={cart.items} />
        </div>

        <div className="mt-4 pb-4 border-b border-gray-200">
          <InvoiceSubtotals
            subtotal={subtotal}
            discount={discount}
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
