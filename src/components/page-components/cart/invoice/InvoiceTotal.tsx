import React from 'react'
import InvoiceLine from './InvoiceLine';

type InvoiceTotalProps = {
  total: number;
}

const InvoiceTotal: React.FC<InvoiceTotalProps> = ({total}) => {
  return (
    <InvoiceLine 
    leftItem={<span>TOTAL</span>}
    rightItem={<span className="font-medium text-right">$ {total}</span>}
    
    />
  )
}

export default InvoiceTotal