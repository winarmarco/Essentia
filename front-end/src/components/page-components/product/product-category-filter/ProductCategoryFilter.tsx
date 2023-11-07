import CategoryFilterType from "@/utils2/types/CategoryFilter";
import CategoryItemType from "@/utils2/types/CategoryItem";
import React from "react";
import {ICategory} from "@/utils/types/category";
import Link from "next/link";
import {twMerge} from "tailwind-merge";

const ProductCategoryFilter: React.FC<{
  categories: ICategory[];
  active: number;
}> = ({categories, active}) => {
  return (
    <ul>
      {categories.map((category, index) => (
        <Link key={category._id} href={"/"}>
          <li
            className={twMerge(
              `text-xl mt-5 capitalize cursor-pointer, ${
                active == index ? "font-bold" : "font-normal"
              }`
            )}
          >
            {category.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ProductCategoryFilter;
