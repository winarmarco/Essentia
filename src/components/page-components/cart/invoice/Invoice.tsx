"use client"

import React, { useEffect, useState } from "react";
import InvoiceProductList from "./InvoiceProductList";
import InvoiceSubtotals from "./InvoiceSubtotals";
import InvoiceTotal from "./InvoiceTotal";
import {
  calculateDiscountDollar,
  calculateSubtotals,
} from "@/utils/functions/Invoice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/store";
import { fetchCart } from "@/utils/redux/Cart/CartActions";

const Invoice: React.FC<{title?: string}> = ({title = "INVOICE"}) => {
  const disptach =  useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const discountCoupon = useSelector((state: RootState) => state.discountCoupon);

  const subtotal = calculateSubtotals(cart);
  const discountDollarAmount: number = (discountCoupon.discountCode) ?  calculateDiscountDollar(subtotal, discountCoupon) : 0;
  const total = subtotal - discountDollarAmount;

  useEffect(() => {
    disptach(fetchCart());
  }, [disptach]);



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
