import Button from "@/components/common/Button";
import Product from "@/utils/types/Product";
import React from "react";

const ProductDetailsDescription: React.FC<Product>= ({name, description, price}) => {
  return (
    <div className="flex flex-col  px-5 mt-10 md:pt-20">
      <h2 className="text-3xl font-semibold">{name}</h2>
      <p className="leading-loose pt-2 whitespace-pre-line">
        {description.trim()}
      </p>
      <span className="mt-10">Price : {`$ ${price}`}</span>
      <Button className="mt-20" filled>Add to cart + </Button>
    </div>
  );
};

export default ProductDetailsDescription;
