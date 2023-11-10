"use client";

import React, { useReducer } from "react";
import InvoiceProductList from "./InvoiceProductList";
import InvoiceSubtotals from "./InvoiceSubtotals";
import InvoiceTotal from "./InvoiceTotal";
import {
  calculateDiscountDollar,
  calculateSubtotals,
} from "@/utils/functions/Invoice";
import {ICart} from "@/utils/types/cart";
import { IDiscountCouponClient } from "@/utils/types/discountCoupon";
import { RootState } from "@/utils/redux/store";
import { useSelector } from "react-redux";

const Invoice: React.FC<{
  cart: ICart;
  discountCoupon?: IDiscountCouponClient;
  discountAmount: number;
  subTotalPrice: number;
}> = ({cart, subTotalPrice, discountCoupon, discountAmount = 0}) => {

  const total = subTotalPrice - discountAmount;

  return (
    <div className="flex flex-col p-5 pt-[3rem] border border-gray-200 max-w-[600px]">
      <h2 className="text-3xl font-semibold">INVOICE</h2>

      <div className="flex flex-col mt-5">
        <div className="mt-4 pb-4 border-b border-gray-200">
          <InvoiceProductList items={cart.items} />
        </div>

        <div className="mt-4 pb-4 border-b border-gray-200">
          <InvoiceSubtotals
            subtotal={subTotalPrice}
            discount={discountCoupon}
            discountDollarAmount={discountAmount}
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
