import React from "react";

const CartTableHeader = () => {
  return (
    <div className="w-full sticky z-20 top-[5.5rem] bg-white pb-5">
      <span className="text-4xl font-semibold bg-white w-full">Cart</span>
      <div className="grid grid-cols-4 text-center font-semibold pl-5 bg-white pt-20 pb-5 border-b border-gray-200">
        <div className="w-full text-left col-span-2">Product</div>
        <div>Price</div>
        <div>Quantity</div>
      </div>
    </div>
  );
};

export default CartTableHeader;
