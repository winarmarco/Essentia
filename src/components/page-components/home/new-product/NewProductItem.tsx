import Button from "@/components/common/Button";
import RelativeImage from "@/components/common/relative-image/RelativeImage";
import NewProductType from "@/utils/types/NewProduct";
import IProduct from "@/utils/types/Product";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export interface NewProductItemType extends IProduct {
  alignment: "left" | "right";
}

const NewProductItem: React.FC<NewProductItemType> = ({alignment, name, images, shortDescription}) => {
  const contentAlignment = (alignment === "left") ? "sm:flex-row" : "sm:flex-row-reverse";
  const textAlignment = (alignment === "left") ? "sm:text-right" : "sm:text-left"; 

  return (
    <div className={twMerge("w-full flex flex-col newProducts-center justify-between mt-20", contentAlignment)}>
      <RelativeImage src={images[0]} alt="Aria" className="w-full sm:w-[400px] h-[400px]"/>
      <div className={twMerge("mt-5 w-full sm:w-1/3 text-center", textAlignment)}>
        <h1 className="text-3xl font-medium">{name}</h1>
        <p className="leading-loose mt-2">
          {shortDescription}
        </p>
        <Button className="mt-8" filled>Learn more</Button>
      </div>
    </div>
  );
};

export default NewProductItem;