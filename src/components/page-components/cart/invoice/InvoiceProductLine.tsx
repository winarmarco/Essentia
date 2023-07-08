import {ShoppingCartItemType} from "@/types/ShoppingCart";
import React from "react";
import InvoiceLine from "./InvoiceLine";

const InvoiceProductLine: React.FC<ShoppingCartItemType> = ({
  product,
  quantity,
}) => {
  const ItemQuantity = (
    <span>
      <span className="font-medium">{product.name}</span>
      <span className="ml-2">x {quantity}</span>
    </span>
  );

  const TotalPrice = (
    <span className="text-left font-medium">$ {product.price * quantity}</span>
  );

  return <InvoiceLine leftItem={ItemQuantity} rightItem={TotalPrice} />;
};

export default InvoiceProductLine;
