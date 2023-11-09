import React from "react";
import InvoiceProductLine from "./InvoiceProductLine";
import { ICart } from "@/utils/types/cart";

const InvoiceProductList: React.FC<{items: ICart["items"]}> = ({items}) => {
  return (
    <ul>
      {items.map((cartItem, index) => (
        <InvoiceProductLine key={index} {...cartItem} />
      ))}
    </ul>
  );
};

export default InvoiceProductList;
