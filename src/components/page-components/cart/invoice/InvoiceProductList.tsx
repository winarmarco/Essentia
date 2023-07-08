import ShoppingCartType from "@/types/ShoppingCart";
import React from "react";
import InvoiceProductLine from "./InvoiceProductLine";

const InvoiceProductList: React.FC<ShoppingCartType> = ({items}) => {
  return (
    <ul>
      {items.map((cartItem, index) => (
        <InvoiceProductLine key={index} {...cartItem} />
      ))}
    </ul>
  );
};

export default InvoiceProductList;
