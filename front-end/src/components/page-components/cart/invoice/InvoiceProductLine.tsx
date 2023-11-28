import React from "react";
import InvoiceLine from "./InvoiceLine";
import { ICart } from "@/utils/types/cart";
import { IInvoice } from "@/utils/types/Invoice";

interface IInvoiceProductLineItem {
  name: string,
  price: number,
  quantity: number,
}

const InvoiceProductLine: React.FC<IInvoiceProductLineItem> = ({
  name,
  price,
  quantity,
}) => {
  const ItemQuantity = (
    <span>
      <span className="font-medium">{name}</span>
      <span className="ml-2">x {quantity}</span>
    </span>
  );

  const TotalPrice = (
    <span className="text-left font-medium">$ {price * quantity}</span>
  );

  return <InvoiceLine leftItem={ItemQuantity} rightItem={TotalPrice} />;
};

export default InvoiceProductLine;
