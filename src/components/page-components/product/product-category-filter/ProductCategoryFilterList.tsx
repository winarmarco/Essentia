import CategoryFilterType from "@/types/CategoryFilter";
import React from "react";

const ProductCategoryFilterList: React.FC<{
  categoryFilter: CategoryFilterType;
  active?: boolean;
  onClick: React.MouseEventHandler;
}> = ({categoryFilter, active = false, onClick}) => {
  return (
    <li
      onClick={onClick}
      className={`text-xl mt-5 cursor-pointer ${
        active ? "font-bold" : "font-normal"
      }`}
    >
      {categoryFilter.name}
    </li>
  );
};

export default ProductCategoryFilterList;
