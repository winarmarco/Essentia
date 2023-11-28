import React from "react";
import InvoiceProductLine from "./InvoiceProductLine";
import {ICart} from "@/utils/types/cart";
import {IInvoice} from "@/utils/types/Invoice";

const InvoiceProductList: React.FC<{
  items: {name: string; price: number; quantity: number}[];
}> = ({items}) => {
  return (
    <ul>
      {items.map((cartItem, index) => (
        <InvoiceProductLine
          key={index}
          name={cartItem.name}
          price={cartItem.price}
          quantity={cartItem.quantity}
        />
      ))}
    </ul>
  );
};

export default InvoiceProductList;
