import React from "react";

type InvoiceLineProps = {
  leftItem: React.ReactNode;
  rightItem: React.ReactNode;
};

const InvoiceLine: React.FC<InvoiceLineProps> = ({leftItem, rightItem}) => {
  return (
    <li className="grid grid-cols-[2fr_1fr] w-full">
      <div className="">{leftItem}</div>

      <div className="">{rightItem}</div>
    </li>
  );
};

export default InvoiceLine;
