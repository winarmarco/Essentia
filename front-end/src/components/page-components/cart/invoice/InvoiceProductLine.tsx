import React from "react";
import InvoiceLine from "./InvoiceLine";
import { IShoppingCartItem } from "@/utils2/types";

const InvoiceProductLine: React.FC<IShoppingCartItem> = ({
  item,
  quantity,
}) => {
  console.log(item, quantity);
  const ItemQuantity = (
    <span>
      <span className="font-medium">{item.name}</span>
      <span className="ml-2">x {quantity}</span>
    </span>
  );

  const TotalPrice = (
    <span className="text-left font-medium">$ {item.price * quantity}</span>
  );

  return <InvoiceLine leftItem={ItemQuantity} rightItem={TotalPrice} />;
};

export default InvoiceProductLine;
