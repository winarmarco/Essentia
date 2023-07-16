import React from "react";
import Product from "@/utils/types/Product";
import Image, {StaticImageData} from "next/image";
import ProductImage from "./ProductImage";

const ProductImageList: React.FC<{
  images: (string)[];
  zoomImage: (imageIndex: number) => void;
}> = ({images, zoomImage}) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col space-y-10">
      {images.map((image, index) => {
        let className = index > 0 ? "flex md:hidden" : "flex";
        return <ProductImage className={className} image={image} key={index} zoomHandler={() => {zoomImage(index)}}/>;
      })}
    </div>
  );
};

export default ProductImageList;
