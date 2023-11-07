import Button from "@/components/shared/Button";
import RelativeImage from "@/components/shared/relative-image/RelativeImage";
import NewProductType from "@/utils2/types/NewProduct";
import { IProduct } from "@/utils/types/products";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const NewProductItem: React.FC<IProduct & {alignment: string}> = ({alignment, name, images, shortDescription}) => {
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