import React from "react";
import ProductImage from "./ProductImage";
import { IProduct } from "@/utils2/types";

const ProductImageList: React.FC<{
  images: IProduct["images"];
  zoomImage: (imageIndex: number) => void;
}> = ({images, zoomImage}) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col space-y-10">
      {images.map((image, index) => {
        let className = index > 0 ? "flex md:hidden" : "flex";
        return <ProductImage className={className} imageUrl={image} key={index} zoomHandler={() => {zoomImage(index)}}/>;
      })}
    </div>
  );
};

export default ProductImageList;
