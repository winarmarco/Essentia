import React from 'react'
type CustomerNameProps = {
  title: string;
  name: string;
};

const CustomerName: React.FC<CustomerNameProps> = ({title, name}) => {
  return (
    <div className="flex flex-col">
      <span>{title}</span>
      <h1 className="text-2xl font-semibold">{name}</h1>
    </div>
  )
}

export default CustomerName