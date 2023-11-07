"use client"

import React from "react";
import InvoiceProductList from "./InvoiceProductList";
import InvoiceSubtotals from "./InvoiceSubtotals";
import InvoiceTotal from "./InvoiceTotal";
import {
  calculateDiscountDollar,
  calculateSubtotals,
} from "@/utils2/functions/Invoice";
import {IDiscountCouponClient, IShoppingCart } from "@/utils2/types";

const Invoice: React.FC<{cart: IShoppingCart, discountCoupon: IDiscountCouponClient}> = ({cart, discountCoupon}) => {

  const subtotal = calculateSubtotals(cart);
  const discountDollarAmount: number = (discountCoupon && discountCoupon.discountCode) ?  calculateDiscountDollar(subtotal, discountCoupon) : 0;
  const total = subtotal - discountDollarAmount;


  return (
    <div className="flex flex-col p-5 pt-[3rem] border border-gray-200 max-w-[600px]">
      <h2 className="text-3xl font-semibold">INVOICE</h2>

      <div className="flex flex-col mt-5">
        <div className="mt-4 pb-4 border-b border-gray-200">
          <InvoiceProductList items={cart.items} />
        </div>

        <div className="mt-4 pb-4 border-b border-gray-200">
          <InvoiceSubtotals
            subtotal={subtotal}
            discount={discountCoupon}
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
