import ShoppingCartType from "@/utils/types/ShoppingCart";
import React from "react";
import InvoiceProductLine from "./InvoiceProductLine";
import { IShoppingCart } from "@/utils/types";

const InvoiceProductList: React.FC<{items: IShoppingCart["items"]}> = ({items}) => {
  return (
    <ul>
      {items.map((cartItem, index) => (
        <InvoiceProductLine key={index} {...cartItem} />
      ))}
    </ul>
  );
};

export default InvoiceProductList;
