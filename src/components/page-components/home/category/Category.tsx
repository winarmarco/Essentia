import React from "react";
import Image from "next/image";
import CategoryItem from "./CategoryItem";
import Section from "@/components/common/section/section";

// consts
import categoryItemData from "@/utils/constants/categoryItem";

const Category = () => {
  return (
    <Section className="relative flex flex-col sm:flex-row my-20">
      <div className="relative sm:w-1/2 w-full">
        <Image src="/image 38.jpg" alt="blackCouchImage.png" fill />
      </div>

      <div className="flex-1 p-20 flex flex-col ">
        <div className="relative">
          <h1 className="font-medium text-4xl underline underline-offset-8">
            CATEGORIES
          </h1>
        </div>
        <ul className="flex-1 justify-between h-full flex flex-col mt-10">
          {categoryItemData.map((item) => (
            <CategoryItem key={item._id} {...item} />
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Category;
