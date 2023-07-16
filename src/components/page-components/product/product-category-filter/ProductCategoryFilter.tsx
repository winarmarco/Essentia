import CategoryFilterType from "@/utils/types/CategoryFilter";
import CategoryItemType from "@/utils/types/CategoryItem";
import React from "react";
import ProductCategoryFilterList from "./ProductCategoryFilterList";

const ProductCateogoryFilter: React.FC<{
  categoryFilters: CategoryFilterType[];
  selectedFilter: number;
  onSelect: (filter: number) => void;
}> = ({categoryFilters, selectedFilter, onSelect}) => {
  return (
    <ul>
      {categoryFilters.map((categoryFilter, index) => (
        <ProductCategoryFilterList
          key={categoryFilter.key}
          categoryFilter={categoryFilter}
          active={index === selectedFilter}
          onClick={() => {
            onSelect(index);
          }}
        />
      ))}
    </ul>
  );
};

export default ProductCateogoryFilter;
